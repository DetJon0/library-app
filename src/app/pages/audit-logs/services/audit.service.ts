import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UsersParams} from "../../users/services/users.store";
import {environment} from "../../../../environments/environment";
import {AuditParams} from "./audit.store";

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient) {
  }

  getAll(params: AuditParams) {
    return this.http.get<any>(`${environment.apiUrl}/api/auditLog`, {params: this.getUserParams(params)})
  }

  getUserParams(params: AuditParams) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', params.limit)
    httpParams = httpParams.set('offset', params.offset)

    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    if (params.entityId) {
      httpParams = httpParams.set('filter[entityId]', params.entityId)
    }

    if (params.createdByEmail) {
      httpParams = httpParams.set('filter[createdByEamil]', params.createdByEmail)
    }

    if (params.action) {
      httpParams = httpParams.set('filter[action]', params.action)
    }

    if (params.entityNames) {
      httpParams = httpParams.set('filter[entityNames]', params.entityNames)
    }

    if (params.timestampFromRange && params.timestampToRange) {
      httpParams = httpParams.set('filter[timestampRange][]', params.timestampFromRange)
        .append('filter[timestampRange][]', params.timestampToRange)
    }

    console.log(httpParams.toString());
    return httpParams;
  }

}
