import {NgModule} from "@angular/core";
import {LayoutModule} from "../../layout/layout.module";
import { LoanComponent } from './containers/loan/loan.component';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {NewLoanComponent} from "./containers/new-loan/new-loan.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoansFormComponent } from './components/loans-form/loans-form.component';
import { LoansTableComponent } from './components/loans-table/loans-table.component';
import { LoansFiltersComponent } from './components/loans-filters/loans-filters.component';
import { LoansButtonsComponent } from './components/loans-buttons/loans-buttons.component';
import { ViewLoanComponent } from './containers/view-loan/view-loan.component';
import { EditLoanComponent } from './containers/edit-loan/edit-loan.component';
import { ImportLoanComponent } from './containers/import-loan/import-loan.component';
import {SharedModule} from "../../shared/shared.module";
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from "primeng/dropdown";

const routes: Routes = [
  {
    path: '',
    component: LoanComponent,
  },
  {
    path: 'new',
    component: NewLoanComponent,
  },
  {
    path: 'import',
    component: ImportLoanComponent,
  }
];

@NgModule({
    imports: [
        // LayoutModule,
        RouterModule.forChild(routes),
        InputTextModule,
        AutoCompleteModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        CalendarModule,
        DropdownModule
    ],
  declarations: [
    LoanComponent,
    NewLoanComponent,
    LoansFormComponent,
    LoansTableComponent,
    LoansFiltersComponent,
    LoansButtonsComponent,
    ViewLoanComponent,
    EditLoanComponent,
    ImportLoanComponent
  ]
})
export class LoanModule {

}
