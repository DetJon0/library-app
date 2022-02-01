import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {take} from "rxjs";
import {BooksStore} from "../../services/books.store";

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {

  @Input() books!: Book[];
  @Input() total!: number;
  @Input() rows!: number;

  cols!: any[];

  @Output() paginationChanged = new EventEmitter<number>();
  constructor(private bookService: BooksService, private store: BooksStore) { }

  ngOnInit() {
    this.cols = [
      { field: 'isbn', header: 'ISBN' },
      { field: 'title', header: 'Title' },
      { field: 'author', header: 'Author' }
    ];
  }

  paginate(event: any) {
    this.paginationChanged.emit(event);
    console.log(event);
  }

}
