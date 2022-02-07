import {Component} from '@angular/core';
import {LoansStore} from "../../services/loans.store";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent {

  constructor(public store: LoansStore) { }

  ngOnInit() {
  }

  searchParams(event: any) {
    this.store.load ({
      book: event.book,
      member: event.member,
      issueFromDateRange: event.issueFromDateRange,
      issueToDateRange: event.issueToDateRange,
      dueToDateRange: event.dueToDateRange,
      dueFromDateRange: event.dueToDateRange,
      returnFromDateRange: event.returnFromDateRange,
      returnToDateRange: event.returnToDateRange,
      status: event.status,
      })
  }

}
