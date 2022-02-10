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
import {RouterModule, Routes} from "@angular/router";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {UsersStore} from "./services/users.store";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'new',
    component: NewUserComponent
  },
  {
    path: 'import',
    component: ImportUserComponent
  },
  {
    path: ':id',
    component: ViewUserComponent
  }
]


@NgModule({
  declarations: [
    UsersComponent,
    EditUserComponent,
    ImportUserComponent,
    ViewUserComponent,
    NewUserComponent,
    UsersFormComponent,
    UsersTableComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    TableModule,
    FormsModule,
    PaginatorModule,
    CalendarModule,
    DropdownModule,
  ],
  providers: [
    UsersStore
  ]
})
export class UsersModule { }
