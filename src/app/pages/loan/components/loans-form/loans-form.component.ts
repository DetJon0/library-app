import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoansService} from "../../services/loans.service";
import {take} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-loans-form',
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.scss']
})

export class LoansFormComponent implements OnInit {

  books = [];
  members = [];
  formatDate = '';

  issueFromDate!: string | null;
  issueToDate!: string | null;
  dueFromDate!: string | null;
  dueToDate!: string | null;
  returnFromDate!: string | null;
  returnToDate!: string | null;

  @Output() searchQuery = new EventEmitter<{}>();

  constructor(private loansService: LoansService, private fb: FormBuilder) {
  }

  availability = [
    {label: '--', value: null},
    {label: 'In progress', value: 'inProgress'},
    {label: 'Overdue', value: 'overdue'},
    {label: 'Closed', value: 'closed'}
  ];

  form = this.fb.group({
    book: null,
    member: null,
    issueDate: null,
    dueDate: null,
    returnDate: null,
    status: [],
  });

  ngOnInit() {
  }

  //Book Autocomplete
  search(event: any) {
    console.log(event);

    setTimeout(() => {
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
    setTimeout(() => {
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
    console.log(this.form.value.issueDate);

    if (this.form.value.issueDate) {
      this.issueFromDate = this.formatDates(this.form.value.issueDate[0])
      this.issueToDate = this.formatDates(this.form.value.issueDate[1])
    }

    if (this.form.value.dueDate) {
      this.dueFromDate = this.formatDates(this.form.value.dueDate[0])
      this.dueToDate = this.formatDates(this.form.value.dueDate[1])
    }

    if (this.form.value.returnDate) {
      this.returnFromDate = this.formatDates(this.form.value.returnDate[0])
      this.returnToDate = this.formatDates(this.form.value.returnDate[1])
    }

    const object = {
      book: this.form.value.book?.id,
      member: this.form.value.member?.id,
      issueFromDateRange: this.issueFromDate,
      issueToDateRange: this.issueToDate,
      dueFromDateRange: this.dueFromDate,
      dueToDateRange: this.dueToDate,
      returnFromDateRange: this.returnFromDate,
      returnToDateRange: this.returnToDate,
      status: this.form.value.status,
    }

    console.log(object);
    this.searchQuery.emit(object)
  }

  formatDates(date: string) {
    let dateFormatted = null;
    if (date) {
      dateFormatted = formatDate(date, 'yyyy-MM-ddThh:mm:ss', 'en_US')
    }
    return dateFormatted;
  }

}
