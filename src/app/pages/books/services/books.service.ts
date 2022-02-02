import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable} from "rxjs";
import {Book} from "../model/book.model";
import {BooksParams} from "./books.store";
import {BookResponse} from "../model/book-response.model";

export interface BookModelServerResponse {
  rows: Book[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {
  }

  postBook(data: Book): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/book`, {
        data: {...data}
      }
    )
  }

  getBooks(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/book`).pipe(map((res) => {
      return res.rows;
    }))
  }

  getAll(params: BooksParams) {
    return this.http.get<any>(`${environment.apiUrl}/api/book`, {params: this.getBookParams(params)})
  }

  getBookParams(params: BooksParams) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', params.limit)
    httpParams = httpParams.set('offset', params.offset)

    if (params.isbn) {
      httpParams = httpParams.set('filter[isbn]', params.isbn)
    }

    if (params.title) {
      httpParams = httpParams.set('filter[title]', params.title)
    }

    if (params.author) {
      httpParams = httpParams.set('filter[author]', params.author)
    }

    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    // console.log(httpParams.toString());
    return httpParams;
  }

  singleDeleteBook(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/book?ids[]={id}`)
  }

  deleteBooks(books: BookResponse[]): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/book`, {params: this.deleteBookParams(books)})
  }

  deleteBookParams(books: BookResponse[]): HttpParams {
    let httpParams = new HttpParams();
    books.forEach(book => {
      httpParams = httpParams.append('ids[]', book.id);
    })
    return httpParams;
  }
}
