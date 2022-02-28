import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { UsersStore} from "../../services/users.store";
import {UsersTableComponent} from "../../components/users-table/users-table.component";
import {UserDisable} from "../../model/user-disable.model";
import {take} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {UsersService} from "../../services/users.service";
import * as FileSaver from "file-saver";
import {exportExcel} from "../../../../shared/export-excel/export-excel.function";
import {UsersResponse} from "../../model/user-response.model";
import {PaginationModel} from "../../../../shared/models/pagination.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  idArray: string[] = [];

  usersSelection: UsersResponse[] = [];

  @ViewChild(UsersTableComponent) table!: UsersTableComponent;

  constructor(public store: UsersStore, private confirmationService: ConfirmationService, private usersService: UsersService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.store.load({})
  }

  exportFile() {
    exportExcel(this.table.users)
  }

  selectedUsers(event: UsersResponse[]) {
    console.log(event);
    this.usersSelection = event;
    console.log(this.usersSelection);
  }

  paginate(event: PaginationModel) {
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
      role: event.role,
    })
  }

  onStatusChangeUser(status: boolean) {
    console.log(this.table.selectedUsers);

    this.table.selectedUsers.map((user) => {
      console.log(user)
      this.idArray.push(user.id)

      const userData: UserDisable = {
        ids: this.idArray,
        disabled: status,
      }

      console.log(userData);

      console.log(this.table.selectedUsers.length);

      if(this.table.selectedUsers.length !== 0) {
        this.confirmationService.confirm({
          message: 'Are you sure?',
          accept: () => {
            this.usersService.userStatusChange(userData).pipe(take(1)).subscribe({
              next: (res) => {
                this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Disabled succesfully'})
                this.usersSelection = [];
                console.log(this.usersSelection);
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
    })

  }

}
