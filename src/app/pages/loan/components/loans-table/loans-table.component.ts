import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../../books/model/book.model";
import {BookResponse} from "../../../books/model/book-response.model";
import {LoanBookResponse} from "../../model/loan-book-response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LoansService} from "../../services/loans.service";
import {LoansStore} from "../../services/loans.store";
import {ConfirmationService, MessageService} from "primeng/api";
import {SortModel} from "../../../../shared/models/sort.model";
import {PaginationModel} from "../../../../shared/models/pagination.model";

@Component({
  selector: 'app-loans-table',
  templateUrl: './loans-table.component.html',
  styleUrls: ['./loans-table.component.scss']
})
export class LoansTableComponent implements OnInit {

  @Input() books!: LoanBookResponse[];
  @Input() total!: number;
  @Input() rows!: number;

  @Input() loading!: boolean;

  cols = [
    {field: 'book', header: 'Book'},
    {field: 'member', header: 'Member'},
    {field: 'issueDate', header: 'Issue Date'},
    {field: 'dueDate', header: 'Due Date'},
    {field: 'returnDate', header: 'Return Date'},
    {field: 'status', header: 'Status'},
  ];

  @Output() paginationChanged = new EventEmitter<PaginationModel>();
  @Output() sortChanged = new EventEmitter<string>();
  @Output() loansSelection = new EventEmitter<LoanBookResponse[]>();

  selectedBooks: LoanBookResponse[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
              private loansService: LoansService,
              private store: LoansStore,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  selectionChange(event: LoanBookResponse[]) {
    console.log(event);
    this.loansSelection.emit(event)
  }

  paginate(event: PaginationModel) {
    console.log(event);
    this.paginationChanged.emit(event);
  }

  sort(event: SortModel) {
    // console.log(event);
    const sortQuery = `${event.sortField}_${event.sortOrder === 1 ? 'ASC' : 'DESC'}`

    if (!!event.sortField && !!event.sortOrder) this.sortChanged.emit(sortQuery);
  }

  onView(rowData: LoanBookResponse) {
    console.log(rowData);
    let id = rowData.id;
    console.log(id);

    if (id) {
      this.router.navigate([id], { relativeTo: this.route });
    }
  }

  onDelete(rowData: LoanBookResponse) {
    console.log(rowData);
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.loansService.singleLoanDeleteBook(rowData.id).subscribe({
          next: (res) => {
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Deleted succesfully'})
            this.store.load({})
          },
          error: err => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
            console.log(err);
          }
        })
      }
    })
  }

  onEdit(rowData: LoanBookResponse) {
    console.log(rowData);
    let id = rowData.id;

    if (id) {
      this.router.navigate([id, 'edit'], { relativeTo: this.route });
    }
  }

}
