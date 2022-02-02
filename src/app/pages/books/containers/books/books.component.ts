import {Component, OnInit, ViewChild} from '@angular/core';
import {BooksStore} from "../../services/books.store";
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book.model";
import {BooksTableComponent} from "../../components/books-table/books-table.component";
import {take} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  @ViewChild(BooksTableComponent) table!: BooksTableComponent;

  constructor(public store: BooksStore, private booksService: BooksService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.store.load({});
  }

  paginate(event: any) {
    this.store.load({limit: event.rows, offset: event.first})
  }

  sort(orderBy: string): void {
    console.log(orderBy)
    this.store.load({orderBy, offset: 0});
  }

  searchParams(event: any) {
    this.store.load({isbn: event.isbn, title:event.title, author: event.author })
  }

  onDeleteButton() {
    console.log(this.table.selectedBooks)

    if(this.table.selectedBooks.length !== 0) {
      this.booksService.deleteBooks(this.table.selectedBooks).pipe(take(1)).subscribe({
        next: (res) => {
          this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Deleted succesfully'})
          this.table.selectedBooks.length = 0;
          this.store.load({})
        },
        error: err => {
          this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
          console.log(err);
        }
      })
    }

  }

}
