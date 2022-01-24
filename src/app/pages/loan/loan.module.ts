import {NgModule} from "@angular/core";
import {LayoutModule} from "../../layout/layout.module";
import { LoanComponent } from './containers/loan/loan.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forChild([{ path: '', component: LoanComponent }])
  ],
  declarations: [
    LoanComponent
  ]
})
export class LoanModule {

}
