import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BookModel} from "../model/book.model";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {
  }

  postBook(data: BookModel): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/book`, {
    data: {...data}}
    )
  }

}
