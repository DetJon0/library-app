import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../services/country.service";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  countries!: any[];
  selectedCountryAdvanced!: 'test';
  filteredCountries!: any[];

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.getCountries();
  }


}
