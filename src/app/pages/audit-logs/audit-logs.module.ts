import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditComponent } from './containers/audit/audit.component';
import {RouterModule, Routes} from "@angular/router";
import { ViewAuditComponent } from './containers/view-audit/view-audit.component';
import { AuditFormComponent } from './components/audit-form/audit-form.component';
import { AuditTableComponent } from './components/audit-table/audit-table.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {CalendarModule} from "primeng/calendar";
import {InputMaskModule} from "primeng/inputmask";
import {ChipsModule} from "primeng/chips";

const routes: Routes = [
  {
    path: '',
    component: AuditComponent
  }
]

@NgModule({
  declarations: [
    AuditComponent,
    ViewAuditComponent,
    AuditFormComponent,
    AuditTableComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PaginatorModule,
    CalendarModule,
    InputMaskModule,
    ChipsModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    TableModule,
    FormsModule,
  ]
})
export class AuditLogsModule { }
