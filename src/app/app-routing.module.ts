import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/auth/signin', pathMatch: 'full'},
  {
    path: 'auth', component: AuthLayoutComponent, children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
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