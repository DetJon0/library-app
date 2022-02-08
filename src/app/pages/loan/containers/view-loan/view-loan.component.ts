import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {LoanBookResponse} from "../../model/loan-book-response.model";
import {ActivatedRoute} from "@angular/router";
import {LoansService} from "../../services/loans.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.component.html',
  styleUrls: ['./view-loan.component.scss']
})
export class ViewLoanComponent implements OnInit {

  book$: Observable<LoanBookResponse | null> = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) =>
      id
        ? this.loansService.getLoanBookById(id).pipe(
          catchError((err) => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'Book not found'})
            return of(null);
          })
        )
        : of(null)
    )
  );

  constructor(private loansService: LoansService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
