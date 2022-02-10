import { Component, OnInit } from '@angular/core';
import {Subscription, take} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {LoansService} from "../../services/loans.service";
import * as dayjs from "dayjs";
import {LoanData, } from "../../model/post-loan-model";
import {MessageService} from "primeng/api";
import {LoansStore} from "../../services/loans.store";
import { Router} from "@angular/router";

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.scss']
})
export class NewLoanComponent implements OnInit {

  currentDate = new Date();
  inputDate: boolean = false;
  status: string = '';

  books = [];
  members = [];

  subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private loansService: LoansService, private messageService: MessageService,
               private store: LoansStore, private router: Router) {
  }

  form = this.fb.group({
    book: [null, Validators.required],
    member: [null, Validators.required],
    issueDate: [null, Validators.required],
    dueDate: [null, Validators.required],
    status: null
  });

  ngOnInit() {

    // const cValue = formatDate(this.currentDate, 'MM/dd/yyyy', 'en-US');
    // console.log(cValue);

    this.subscription = this.form.valueChanges.subscribe(x => {
      this.inputDate = true;

      if(x.issueDate) {

        console.log(x.issueDate);
        let issueDateValue = dayjs(x.issueDate).format('YYYY-MM-DDTHH:mm:ss');

        let dueDateValue = dayjs(issueDateValue).add(4, 'day').format('YYYY-MM-DDTHH:mm:ss');

        let duePatchedDate = dayjs(dueDateValue).format('MM/DD/YYYY');

        console.log(issueDateValue);
        console.log(dueDateValue);
        console.log(duePatchedDate);

        let today = new Date();
        console.log(today);
        let todayDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');

        console.log(todayDate);

        // const diff = todayDate.diff(dueDateValue)

        let dayDue = dayjs(dueDateValue);
        let dayToday = dayjs(todayDate);

        // let monthDue =

        const difference = dayDue.diff(dayToday)

        console.log(difference);

        console.log(dayDue);
        console.log(dayToday);

        if(difference > 0) {
          this.status = 'inProgress'
        } else {
          this.status = 'overdue'
        }

        this.form.patchValue({
          dueDate: duePatchedDate,
          status: this.status,
        }, {emitEvent: false})

      } else {
        this.inputDate = false;

        this.form.patchValue({
          dueDate: null
        }, {emitEvent: false})

      }
    })

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

  onSave() {
    console.log(this.form.value);
    console.log(this.form.value.book.id);

    let today = new Date();
    console.log(today);
    let todayDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');

    let dayDue = dayjs(this.form.value.dueDate).date();
    let dayToday = dayjs(todayDate).date();

    console.log(dayDue);
    console.log(dayToday);

    let issueDate = this.form.value.issueDate;
    let dueDate = this.form.value.dueDate;

    let formattedIssueDate = dayjs(issueDate).format('YYYY-MM-DDTHH:mm:ss');
    let formattedDueDate = dayjs(dueDate).format('YYYY-MM-DDTHH:mm:ss');
    // console.log(issueDate);
    // console.log(dueDate);
    console.log(formattedIssueDate);
    console.log(formattedDueDate);
    // console.log(this.status);

    const Loan: LoanData = {
      book: this.form.value.book.id,
      member: this.form.value.member.id,
      issueDate: formattedIssueDate,
      dueDate: formattedDueDate,
      status: this.status,
    }

    console.log(Loan);

    this.loansService.postLoan(Loan).subscribe({
        next: (res) => {
          this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Created succesfully'})
          this.store.load({})
          this.router.navigateByUrl('/loan');
        },
        error: (err) => {
          this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
          console.log(err);
        }
      }
    )

  }

  addDays(date: Date, period: number) {
    date.setDate(date.getDate() + period)
    return date;
  }

  get statusValue() {
    return this.form.get('status')?.value;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
