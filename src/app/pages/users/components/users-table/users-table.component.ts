import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersResponse} from "../../model/user-response.model";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Input() users!: UsersResponse[];
  @Input() total!: number;
  @Input() rows!: number;

  @Input() loading!: boolean;

  cols = [
    {field: 'email', header: 'Email'},
    {field: 'name', header: 'Name'},
    {field: 'roles', header: 'Roles'},
    {field: 'status', header: 'Status'},
    {field: 'createdAt', header: 'Created at'},
  ];

  @Output() paginationChanged = new EventEmitter<number>();
  @Output() sortChanged = new EventEmitter<string>();
  @Output() userSelection = new EventEmitter<[]>();

  @Input() selectedUsers: UsersResponse[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.books);
  }

  selectionChange(event: any) {
    console.log(event)
    this.userSelection.emit(event)
  }

  paginate(event: any) {
    this.paginationChanged.emit(event);
  }

  sort(event: any) {
    const sortQuery = `${event.sortField}_${event.sortOrder === 1 ? 'ASC' : 'DESC'}`

    if (!!event.sortField && !!event.sortOrder) this.sortChanged.emit(sortQuery);
  }

  onView(rowData: UsersResponse) {
    console.log(rowData);
    let id = rowData.id;
    // console.log(id);

    if (id) {
      this.router.navigate([id], { relativeTo: this.route });
    }
  }

  onEdit(rowData: UsersResponse) {
    console.log(rowData);
    let id = rowData.id;
    // console.log(id);

    if (id) {
      this.router.navigate([id, 'edit'], { relativeTo: this.route });
    }
  }

}
