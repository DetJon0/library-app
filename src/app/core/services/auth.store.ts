import {Injectable} from '@angular/core';
import {BehaviorSubject, pluck} from "rxjs";
import {User} from "../../models/user.model";

export interface AuthState {
  token: string | null;
  user: User | null
}

export const initialState: AuthState = {
  token: null,
  user: null
}

@Injectable({providedIn: 'root'})
export class AuthStore {

  state$$ = new BehaviorSubject<AuthState>(initialState)
  state$ = this.state$$.asObservable();
  user$ = this.state$.pipe(pluck('user'))

  constructor() {
  }

  get state(): AuthState {
    return this.state$$.getValue();
  }

  get token(): string | null {
    return this.state$$.getValue().token;
  }

  setToken(token: string): void {
    // we set the token to our initial state
    this.state$$.next({...this.state, token});
  }

  setUser(user: User): void {
    // we set the user that we get
    this.state$$.next({...this.state, user})
  }

  setState(state: AuthState): void {
    this.state$$.next({...this.state});
  }

}
