import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LoansParams} from "../../loan/services/loans.store";
import {environment} from "../../../../environments/environment";
import {UsersParams} from "./users.store";
import {UserDisable} from "../model/user-disable.model";
import {Observable} from "rxjs";
import {BookResponse} from "../../books/model/book-response.model";
import {UsersResponse} from "../model/user-response.model";

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getAll(params: UsersParams) {
    return this.http.get<any>(`${environment.apiUrl}/api/iam/user`, {params: this.getUserParams(params)})
  }

  getUserParams(params: UsersParams) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', params.limit)
    httpParams = httpParams.set('offset', params.offset)

    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    if (params.id) {
      httpParams = httpParams.set('filter[id]', params.id)
    }

    if (params.email) {
      httpParams = httpParams.set('filter[email]', params.email)
    }

    if (params.name) {
      httpParams = httpParams.set('filter[fullName]', params.name)
    }

    if (params.role) {
      httpParams = httpParams.set('filter[role]', params.role)
    }

    if (params.status) {
      httpParams = httpParams.set('filter[status]', params.status)
    }

    if (params.createdAtFirst && params.createdAtSecond) {
      httpParams = httpParams.set('filter[createdAtRange]', params.createdAtFirst)
        .append('filter[createdAtRange]', params.createdAtSecond)
    }

    // console.log(httpParams.toString());
    return httpParams;
  }

  userStatusChange(data: UserDisable) {
    return this.http.put(`${environment.apiUrl}/api/iam/status`, data)
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<UsersResponse>(`${environment.apiUrl}/api/iam/${id}`);
  }

}
