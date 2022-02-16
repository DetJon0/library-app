import {Injectable} from "@angular/core";
import {AuditLogsModel} from "../model/audit.model";
import {ComponentStore} from "@ngrx/component-store";
import {AuditService} from "./audit.service";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {UserServerResponse, UsersParams} from "../../users/services/users.store";

export interface AuditServerResponse {
  rows: AuditLogsModel[];
  count: number;
}

export interface AuditParams {
  orderBy: string | null;
  limit: number;
  offset: number;
  period: string | null;
  entityId: string | null;
  entityNames: string | null;
  timestampFromRange: string | null;
  timestampToRange: string | null;
  createdByEmail: string | null;
  action: string | null;
}

export interface AuditState {
  data: AuditLogsModel[],
  params: AuditParams,
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: AuditState = {
  data: [],
  params: {
    orderBy: null,
    limit: 10,
    offset: 0,
    period: null,
    entityId: null,
    entityNames: null,
    timestampFromRange: null,
    timestampToRange: null,
    createdByEmail: null,
    action: null,
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}


@Injectable()
export class AuditStore extends ComponentStore<AuditState> {

  constructor(private auditService: AuditService) {
    super(initialState)
  }

  get params() {
    return this.get(s => s.params);
  }

  load = this.effect((params$: Observable<Partial<AuditParams>>) => params$
    .pipe(tap(() => this.patchState({ loading: true, loaded: false, error: null })),
      switchMap(params => {
        const currentParams = this.params;
        const newParams = { ...currentParams, ...params };
        return this.auditService.getAll(newParams).pipe(tap((response: AuditServerResponse) =>
            this.patchState(
              {
                loading: false,
                loaded: true,
                data: response.rows,
                params: newParams,
                total: Number(response.count)
              })
          ), catchError(error => {
              this.patchState({
                error: error.message, data: [], loaded: false, loading: false,
                params: initialState.params
              });
              return EMPTY;
            }
          )
        );
      })
    ));

}
