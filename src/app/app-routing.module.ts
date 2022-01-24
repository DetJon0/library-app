import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/auth/signin', pathMatch: 'full'},
  {
    // non auth guard
    path: 'auth', component: AuthLayoutComponent, children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      }
    ]
  },
    {
      //auth guards
      path: '', component: MainLayoutComponent, children: [
        {
          path: 'loan',
          loadChildren: () =>
            import('./pages/loan/loan.module').then((m) => m.LoanModule),
        }
      ]
    }
]
;

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
