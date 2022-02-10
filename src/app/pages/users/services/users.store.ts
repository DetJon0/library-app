import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import { UsersResponse} from "../model/user-response.model";
import {UsersService} from "./users.service";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {LoanServerResponse, LoansParams} from "../../loan/services/loans.store";

export interface UserServerResponse {
  rows: UsersResponse[];
  count: number;
}

export interface UsersParams {
  orderBy: string | null;
  limit: number;
  offset: number;
  id: string | null;
  createdAtFirst: string | null;
  createdAtSecond: string | null;
  email: string | null;
  name: string | null;
  status: string | null;
  role: string | null;
}

export interface UsersState {
  data: UsersResponse[],
  params: UsersParams,
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: UsersState = {
  data: [],
  params: {
    orderBy: null,
    limit: 10,
    offset: 0,
    id: null,
    createdAtFirst: null,
    createdAtSecond: null,
    email: null,
    name: null,
    status: null,
    role: null,
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {

  constructor(private usersService: UsersService) {
    super(initialState);
  }

  get params() {
    return this.get(s => s.params);
  }

  load = this.effect((params$: Observable<Partial<UsersParams>>) => params$
    .pipe(tap(() => this.patchState({ loading: true, loaded: false, error: null })),
      switchMap(params => {
        const currentParams = this.params;
        const newParams = { ...currentParams, ...params };
        return this.usersService.getAll(newParams).pipe(tap((response: UserServerResponse) =>
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
