import {NgModule} from "@angular/core";
import {LayoutModule} from "../../layout/layout.module";
import { LoanComponent } from './containers/loan/loan.component';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {NewLoanComponent} from "./containers/new-loan/new-loan.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: LoanComponent,
  },
  {
    path: 'new',
    component: NewLoanComponent,
  }
];

@NgModule({
  imports: [
    // LayoutModule,
    RouterModule.forChild(routes),
    InputTextModule,
    AutoCompleteModule,
    FormsModule
  ],
  declarations: [
    LoanComponent,
    NewLoanComponent
  ]
})
export class LoanModule {

}
