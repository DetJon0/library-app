import {Component, OnInit, ViewChild} from '@angular/core';
import {BooksStore} from "../../services/books.store";
import {BooksService} from "../../services/books.service";
import {BooksTableComponent} from "../../components/books-table/books-table.component";
import {take} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {BookResponse} from "../../model/book-response.model";
import {exportExcel} from "../../../../shared/export-excel/export-excel.function";
import {PaginationModel} from "../../../../shared/models/pagination.model";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  booksSelection: BookResponse[] = [];

  @ViewChild(BooksTableComponent) table!: BooksTableComponent;

  constructor(
    public store: BooksStore,
    private booksService: BooksService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.store.load({});
  }

  exportFile() {
    exportExcel(this.table.books)
  }

  bookChanged(event: BookResponse[]) {
    console.log(event);
    this.booksSelection = event
  }

  paginate(event: PaginationModel) {
    this.store.load({limit: event.rows, offset: event.first})
  }

  sort(orderBy: string): void {
    console.log(orderBy)
    this.store.load({orderBy, offset: 0});
  }

  searchParams(event: any) {
    console.log(event);
    this.store.load({isbn: event.isbn, title:event.title, author: event.author, status: event.status })
  }

  onDeleteButton() {
    console.log(this.table.selectedBooks)

    if(this.table.selectedBooks.length !== 0) {
      this.confirmationService.confirm({
        message: 'Are you sure?',
        accept: () => {
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
      })

    }

  }

}
