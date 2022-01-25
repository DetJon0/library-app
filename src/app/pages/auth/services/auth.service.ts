import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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

}
