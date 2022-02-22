import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LoansTableComponent} from "../../../loan/components/loans-table/loans-table.component";
import {UsersState, UsersStore} from "../../services/users.store";
import {UsersTableComponent} from "../../components/users-table/users-table.component";
import {UserDisable} from "../../model/user-disable.model";
import {take} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {UsersService} from "../../services/users.service";
import {UsersResponse} from "../../model/user-response.model";
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  idArray: string[] = [];

  usersSelection: [] = [];

  @ViewChild(UsersTableComponent) table!: UsersTableComponent;

  constructor(public store: UsersStore, private confirmationService: ConfirmationService, private usersService: UsersService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.store.load({})
  }

  exportExcel(state: UsersState) {
    console.log(state);
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(state.data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "data");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  selectedUsers(event: any) {
    this.usersSelection = event;
    console.log(this.usersSelection);
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
