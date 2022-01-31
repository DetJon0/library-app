import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable} from "rxjs";
import {Book} from "../model/book.model";

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

}
