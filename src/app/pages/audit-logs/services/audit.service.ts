import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UsersParams} from "../../users/services/users.store";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuditService {

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

    if (params.entityId) {
      httpParams = httpParams.set('filter[entityId]', params.entityId)
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

    if (params.timestampFromRange && params.timestampToRange) {
      httpParams = httpParams.set('filter[timeStampRange]', params.timestampFromRange)
        .append('filter[timeStampRange]', params.timestampToRange)
    }

    // console.log(httpParams.toString());
    return httpParams;
  }

}
