import {Component, OnInit} from '@angular/core';
import {BooksStore} from "../../services/books.store";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(public store: BooksStore) {
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

}
