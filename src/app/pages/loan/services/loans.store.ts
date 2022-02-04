import {Injectable} from "@angular/core";
import {LoanBook} from "../model/loan-book.model";
import {ComponentStore} from "@ngrx/component-store";
import {LoansService} from "./loans.service";

export interface LoansParams {
  orderBy: string | null;
  limit: number;
  offset: number;
  member: string| null;
  book: string | null;
  status: string | null;
  issueDateRange: string | null;
  issueToDateRange: string | null;
  dueDateRange: string | null;
  dueToDateRange: string | null;
  returnDateRange: string | null;
  returnToDateRange: string | null;
}

export interface LoansState {
  data: LoanBook[],
  params: LoansParams,
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: LoansState = {
  data: [],
  params: {
    orderBy: null,
    limit: 10,
    offset: 0,
    member: null;
    book: null;
    status: null;
    issueDateRange: null;
    issueToDateRange: null;
    dueDateRange: null;
    dueToDateRange: null;
    returnDateRange: null;
    returnToDateRange: null;
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}

@Injectable()
export class LoansStore extends ComponentStore<LoansState> {

  constructor(private loansService: LoansService) {
    super(initialState);
  }

  get params() {
    return this.get(s => s.params);
  }


}
