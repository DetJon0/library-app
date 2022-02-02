import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {BooksStore} from "../../services/books.store";
import {BookResponse} from "../../model/book-response.model";

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
    {field: 'status', header: 'Status'},
  ];

  @Output() paginationChanged = new EventEmitter<number>();
  @Output() sortChanged = new EventEmitter<string>();

  selectedBooks!: BookResponse[];

  constructor(private bookService: BooksService, private store: BooksStore) {
  }

  ngOnInit() {
  }

  paginate(event: any) {
    this.paginationChanged.emit(event);
  }

  sort(event: any) {
    // console.log('ktu', event);
    const sortQuery = `${event.sortField}_${event.sortOrder === 1 ? 'ASC' : 'DESC'}`

    if (!!event.sortField && !!event.sortOrder) this.sortChanged.emit(sortQuery);
  }

  onDeleteBook() {
    console.log(this.selectedBooks);
  }
}
