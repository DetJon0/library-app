import {Injectable} from '@angular/core';
import {Book} from "../model/book.model";
import {ComponentStore} from "@ngrx/component-store";

export interface BooksParams {
  orderBy: string | null;
  limit: number;
  offset: number;
  isbn: string| null;
  title: string | null;
  status: string | null;
  author: string | null;
}

export interface BooksState {
  data: Book[],
  params: BooksParams,
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: BooksState = {
  data: [],
  params: {
    orderBy: null,
    limit: 10,
    offset: 0,
    isbn: null,
    title: null,
    status: null,
    author: null,
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0
}

@Injectable()
export class BooksStore extends ComponentStore<BooksState>{

  constructor() {
    super(initialState);
  }

  get params() {
    return this.get(s => s.params);
  }
  //
  // load = this.effect()
//  this.store.load({})
}
