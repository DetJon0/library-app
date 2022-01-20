import {NgModule} from "@angular/core";
import {LayoutModule} from "../../layout/layout.module";
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from './containers/sign-in/sign-in.component';
import {SignUpComponent} from './containers/sign-up/sign-up.component';
import {PasswordModule } from 'primeng/password';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from 'primeng/checkbox';
import {CommonModule} from "@angular/common";
import {LoaddingSpinnerComponent} from "./components/loadding-spinner/loadding-spinner.component";


const routes: Routes = [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      },
      {
        path: 'signin',
        component: SignInComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
];

@NgModule({
  imports: [LayoutModule,
    RouterModule.forChild(routes),
    PasswordModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    CommonModule
  ],
  exports: [RouterModule],
  declarations: [
    SignInComponent,
    SignUpComponent,
    LoaddingSpinnerComponent
  ],
})
export class AuthModule {

}
