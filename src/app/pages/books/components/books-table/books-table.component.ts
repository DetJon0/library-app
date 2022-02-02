import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {BooksStore} from "../../services/books.store";
import {BookResponse} from "../../model/book-response.model";
import {take} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {

  @Input() books!: Book[];
  @Input() total!: number;
  @Input() rows!: number;

  cols = [
    {field: 'isbn', header: 'ISBN'},
    {field: 'title', header: 'Title'},
    {field: 'author', header: 'Author'},
  ];

  @Output() paginationChanged = new EventEmitter<number>();
  @Output() sortChanged = new EventEmitter<string>();

  selectedBooks: BookResponse[] = [];

  constructor(private booksService: BooksService, private store: BooksStore, private messageService: MessageService) {
  }

  ngOnInit() {
    console.log(this.selectedBooks);
  }

  paginate(event: any) {
    this.paginationChanged.emit(event);
  }

  sort(event: any) {
    // console.log('ktu', event);
    const sortQuery = `${event.sortField}_${event.sortOrder === 1 ? 'ASC' : 'DESC'}`

    if (!!event.sortField && !!event.sortOrder) this.sortChanged.emit(sortQuery);
  }

  onDeleteConfirmation(rowData: any) {
    // this.selectedBooks.push(rowData);
    console.log(rowData.id);

    this.booksService.singleDeleteBook(rowData.id).subscribe({
      next: (res) => {
        this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Deleted succesfully'})
        this.store.load({})
      },
      error: err => {
        this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
        console.log(err);
      }
    })
  }


}
