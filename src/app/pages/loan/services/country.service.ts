import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  constructor(private http: HttpClient) {
  }

  getCountries() {
    return this.http.get('showcase/resources/data/countries.json');
  }

  getBooks(query: string): Observable<any> {
    let path = `http://localhost:8080/api/book/autocomplete?limit=10`;
    if (query) {
      path += `&query=${query}`
    }
    //`http://localhost:8080/api/api/book/autocomplete?query=T&limit=10`
    return this.http.get(path);
  }
}
