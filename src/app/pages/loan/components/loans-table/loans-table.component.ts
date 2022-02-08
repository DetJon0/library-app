import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../../books/model/book.model";
import {BookResponse} from "../../../books/model/book-response.model";
import {LoanBookResponse} from "../../model/loan-book-response.model";
import {ActivatedRoute, Router} from "@angular/router";

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

  @Output() paginationChanged = new EventEmitter<number>();
  @Output() sortChanged = new EventEmitter<string>();

  selectedBooks: LoanBookResponse[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.books);
  }

  paginate(event: any) {
    this.paginationChanged.emit(event);
  }

  sort(event: any) {
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

}
