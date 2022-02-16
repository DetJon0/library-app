import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditComponent } from './containers/audit/audit.component';
import {RouterModule, Routes} from "@angular/router";
import { ViewAuditComponent } from './containers/view-audit/view-audit.component';
import { AuditFormComponent } from './components/audit-form/audit-form.component';

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
    AuditFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuditLogsModule { }
