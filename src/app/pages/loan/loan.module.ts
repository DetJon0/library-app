import {NgModule} from "@angular/core";
import {LayoutModule} from "../../layout/layout.module";
import { LoanComponent } from './containers/loan/loan.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: LoanComponent,
  }
];

@NgModule({
  imports: [
    // LayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoanComponent
  ]
})
export class LoanModule {

}
