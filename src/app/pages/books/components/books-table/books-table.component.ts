import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book.model";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {

  books!: Book[];

  cols!: any[];

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.bookService.getBooks().
    subscribe((books: Book[]) => {
      this.books = books;
      console.log(books);
      console.log(this.books);
    });

    this.cols = [
      { field: 'isbn', header: 'ISBN' },
      { field: 'title', header: 'Title' },
      { field: 'author', header: 'Author' }
    ];

  }

}
