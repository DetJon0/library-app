import {Component, OnInit, ViewChild} from '@angular/core';
import {LoansTableComponent} from "../../../loan/components/loans-table/loans-table.component";
import {UsersStore} from "../../services/users.store";
import {UsersTableComponent} from "../../components/users-table/users-table.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(UsersTableComponent) table!: UsersTableComponent;

  disabled: boolean = true;

  constructor(public store: UsersStore) { }

  ngOnInit() {
    this.store.load({})
  }

  paginate(event: any) {
    this.store.load({limit: event.rows, offset: event.first})
  }

  sort(orderBy: string): void {
    console.log(orderBy)
    this.store.load({orderBy, offset: 0});
  }

  searchParams(event: any) {
    this.store.load ({
      id: event.id,
      email: event.email,
      name: event.name,
      status: event.status,
      createdAtFirst: event.createdAtFirst,
      createdAtSecond: event.createdAtSecond,
    })
  }

}
