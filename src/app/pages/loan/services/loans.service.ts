import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {LoansParams} from "./loans.store";

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

    if (params.issueFromDateRange) {
      httpParams = httpParams.set('filter[issueDateRange]', params.issueFromDateRange)
    }

    if (params.issueToDateRange) {
      httpParams = httpParams.set('filter[issueDateRange]', params.issueToDateRange)
    }

    if (params.dueFromDateRange) {
      httpParams = httpParams.set('filter[dueDateRange]', params.dueFromDateRange)
    }

    if (params.dueToDateRange) {
      httpParams = httpParams.set('filter[dueDateRange]', params.dueToDateRange)
    }

    if (params.returnFromDateRange) {
      httpParams = httpParams.set('filter[returnDateRange]', params.returnFromDateRange)
    }

    if (params.returnToDateRange) {
      httpParams = httpParams.set('filter[returnDateRange]', params.returnToDateRange)
    }

    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    // console.log(httpParams.toString());
    return httpParams;
  }

}
