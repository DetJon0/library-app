import { Component, OnInit } from '@angular/core';
import {BooksStore} from "../../services/books.store";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(public store: BooksStore) {}

  ngOnInit() {
    this.store.load({});
  }

}
