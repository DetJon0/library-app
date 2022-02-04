import { Component, OnInit } from '@angular/core';
import {LoansService} from "../../services/loans.service";
import {take} from "rxjs";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-loans-form',
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.scss']
})
export class LoansFormComponent implements OnInit {

  books = [];
  members = [];

  constructor(private loansService: LoansService, private fb: FormBuilder) { }

  availability = [
    { label: '--', value: null },
    { label: 'In progress', value: 'in progress' },
    { label: 'Overdue', value: 'overdue' },
    { label: 'Closed', value: 'closed' }
  ];

  form = this.fb.group({
    book: '',
    member: '',
    issueDate: '',
    dueDate: '',
    returnDate: '',
    status: '',
  });

  ngOnInit() {
  }

  //Book Autocomplete
  search(event: any) {
    console.log(event);

    setTimeout(()=> {
      this.loansService.getBooks(event.query).pipe(take(1)).subscribe(res => {
        this.books = res;
        console.log(this.books)
      })
    }, 500)
  }

  select(event: any) {
    console.log(event);
  }
  //////////////////////////////

  // Member Autocomplete
  searchMember(event: any) {
    setTimeout(()=> {
      this.loansService.getMember(event.query).pipe(take(1)).subscribe(res => {
        this.members = res;
        console.log(this.members)
      })
    }, 500)
  }

  selectMember(event: any) {
    console.log(event);
  }
  /////////////////////////////

  onSearch() {
    console.log(this.form.value);
  }

}
