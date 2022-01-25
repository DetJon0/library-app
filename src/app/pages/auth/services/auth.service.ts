import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {AuthStore} from "../../../core/services/auth.store";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private authStore: AuthStore, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/auth/sign-in`, {
      email: email,
      password: password
    }, {responseType: 'text'})
  }

  me(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/auth/me`);
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/auth/sign-up`, {
      email: email,
      password: password
    }, {responseType: 'text'})
  }

  logout() {
    this.authStore.setState({ token: null, user: null });
    localStorage.clear();
    this.router.navigate(['/auth/signin']);
  }

}
