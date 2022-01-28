import { Component, OnInit } from '@angular/core';
import {CountryService} from "../../services/country.service";
import {take} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-loans-form',
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.scss']
})
export class LoansFormComponent implements OnInit {

  countries!: any[];
  bookSearchQuery = '';
  filteredCountries!: any[];

  constructor(private countryService: CountryService, private fb: FormBuilder) { }

  books = [];

  form = this.fb.group({
    result: ['']
  });

  ngOnInit() {
    this.countryService.getBooks(this.bookSearchQuery).pipe(take(1)).subscribe(res => {
      this.books = res;
      console.log(this.books)
    })
    // this.countryService.getCountries();
  }

  filterBooks(event: any): void {
    console.log(event)
    console.log(this.form.value.result)
    let result = this.form.value.result;
    this.countryService.getBooks(result).pipe(take(1)).subscribe(res => {
      this.books = res;
      console.log(this.books)
    })
  }

  select(event: any) {
    console.log(event);
  }

}
