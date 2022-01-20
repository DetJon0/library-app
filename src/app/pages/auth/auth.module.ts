import {NgModule} from "@angular/core";
import {LayoutModule} from "../../layout/layout.module";
import {RouterModule, Routes} from "@angular/router";
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import {PasswordModule} from 'primeng/password';


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
  ],
  exports: [RouterModule],
  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
})
export class AuthModule {

}
