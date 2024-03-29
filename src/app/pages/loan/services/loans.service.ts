import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {LoansParams} from "./loans.store";
import {BookResponse} from "../../books/model/book-response.model";
import {LoanBookResponse} from "../model/loan-book-response.model";
import {BookEditModel} from "../../books/model/book-edit.model";
import {EditedLoanBook, EditLoanBook} from "../model/edit-loan-book.model";
import {Book} from "../../books/model/book.model";
import {LoanData, LoanPost} from "../model/post-loan-model";

@Injectable({
  providedIn: 'root',
})
export class LoansService {

  constructor(private http: HttpClient) {
  }

  getBooks(query: string): Observable<any> {
    let path = `${environment.apiUrl}/api/book/autocomplete?limit=10`;
    if (query) {
      path += `&query=${query}`
    }
    return this.http.get(path);
  }

  getMember(query: string): Observable<any> {
    let path = `${environment.apiUrl}/api/iam/user/autocomplete?limit=10`;
    if (query) {
      path += `&query=${query}`
    }
    return this.http.get(path);
  }

  getLoanBookById(id: string): Observable<any> {
    return this.http.get<BookResponse>(`${environment.apiUrl}/api/loan/${id}`);
  }

  getAll(params: LoansParams) {
    return this.http.get<any>(`${environment.apiUrl}/api/loan`, {params: this.getLoanParams(params)})
  }

  getLoanParams(params: LoansParams) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', params.limit)
    httpParams = httpParams.set('offset', params.offset)

    if (params.book) {
      httpParams = httpParams.set('filter[book]', params.book)
    }

    if (params.member) {
      httpParams = httpParams.set('filter[member]', params.member)
    }

    if (params.status) {
      httpParams = httpParams.set('filter[status]', params.status)
    }

    if (params.issueFromDateRange && params.issueToDateRange) {
      httpParams = httpParams.set('filter[issueDateRange]', params.issueFromDateRange)
        .append('filter[issueDateRange]', params.issueToDateRange)
    }

    if (params.dueFromDateRange && params.dueToDateRange) {
      httpParams = httpParams.set('filter[dueDateRange]', params.dueFromDateRange)
        .append('filter[dueDateRange]', params.dueToDateRange)
    }

    if (params.returnFromDateRange && params.returnToDateRange) {
      httpParams = httpParams.set('filter[returnDateRange]', params.returnFromDateRange)
        .append('filter[returnDateRange]', params.returnToDateRange)
    }

    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    // console.log(httpParams.toString());
    return httpParams;
  }

  deleteLoans(books: LoanBookResponse[]): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/loan`, {params: this.deleteLoanBookParams(books)})
  }

  deleteLoanBookParams(books: LoanBookResponse[]): HttpParams {
    let httpParams = new HttpParams();
    books.forEach(book => {
      httpParams = httpParams.append('ids[]', book.id);
    })
    return httpParams;
  }

  singleLoanDeleteBook(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/loan?ids[]=${id}`)
  }

  editLoanBook(id: string, book: EditedLoanBook): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/loan/${id}`, book)
  }

  postLoan(data: LoanData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/loan`, {
        data: {...data}
      }
    )
  }

}
