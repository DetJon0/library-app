import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {NonAuthGuard} from "./core/guards/non-auth.guard";

const appRoutes: Routes = [
  {path: '', redirectTo: '/auth/signin', pathMatch: 'full'},
  {
    // non auth guard
    path: 'auth', component: AuthLayoutComponent, children: [
      {
        path: '',
        canActivate: [NonAuthGuard],
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
          canActivate: [AuthGuard],
          loadChildren: () =>
            import('./pages/loan/loan.module').then((m) => m.LoanModule),
        },
        {
          path: 'edit-profile',
          canActivate: [AuthGuard],
          loadChildren: () =>
            import('./pages/edit-profile/edit-profile.module').then((m) => m.EditProfileModule),
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
