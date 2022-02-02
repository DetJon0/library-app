import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable} from "rxjs";
import {Book} from "../model/book.model";
import {BooksParams} from "./books.store";

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
    data: {...data}}
    )
  }

  getBooks(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/book`).pipe(map((res)=>{
      return res.rows;
    }))
  }

  getAll(params: BooksParams) {
    return this.http.get<any>(`${environment.apiUrl}/api/book`, {params: this.getBookParams(params)})
  }

  getBookParams(params: BooksParams): HttpParams {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', params.limit)
    httpParams = httpParams.set('offset', params.offset)

    if(params.isbn) {
      httpParams = httpParams.set('filter[isbn]', params.isbn)
    }

    if(params.title) {
      httpParams = httpParams.set('filter[title]', params.title)
    }

    if(params.author) {
      httpParams = httpParams.set('filter[author]', params.author)
    }

    if(params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    // console.log(httpParams.toString());
    return httpParams;
  }
}
