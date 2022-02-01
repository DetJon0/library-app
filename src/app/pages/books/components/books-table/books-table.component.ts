import {Component, Input, OnInit} from '@angular/core';
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

  cols!: any[];

  constructor(private bookService: BooksService, private store: BooksStore) { }

  ngOnInit() {
    // this.bookService.getBooks().
    // subscribe((books: Book[]) => {
    //   this.books = books;
    //   console.log(books);
    //   console.log(this.books);
    // });
    //

    this.cols = [
      { field: 'isbn', header: 'ISBN' },
      { field: 'title', header: 'Title' },
      { field: 'author', header: 'Author' }
    ];

  }

}
