import { Component, OnInit } from '@angular/core';
import {CountryService} from "../../services/country.service";

@Component({
  selector: 'app-loans-form',
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.scss']
})
export class LoansFormComponent implements OnInit {

  countries!: any[];
  selectedCountryAdvanced!: 'test';
  filteredCountries!: any[];

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.getCountries();
  }

}
