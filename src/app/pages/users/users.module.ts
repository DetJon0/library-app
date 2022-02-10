import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import { UsersComponent } from './containers/users/users.component';
import { EditUserComponent } from './containers/edit-user/edit-user.component';
import { ImportUserComponent } from './containers/import-user/import-user.component';
import { ViewUserComponent } from './containers/view-user/view-user.component';
import { NewUserComponent } from './containers/new-user/new-user.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersTableComponent } from './components/users-table/users-table.component';



@NgModule({
  declarations: [
    UsersComponent,
    EditUserComponent,
    ImportUserComponent,
    ViewUserComponent,
    NewUserComponent,
    UsersFormComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    TableModule,
    FormsModule,
    PaginatorModule,
  ]
})
export class UsersModule { }
