import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {NonAuthGuard} from "./core/guards/non-auth.guard";
import {RoleGuard} from "./core/guards/role.guard";

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
        },
        {
          path: 'book',
          canActivate: [AuthGuard],
          loadChildren: () =>
            import('./pages/books/books.module').then((m) => m.BooksModule),
        },
        {
          path: 'settings',
          canActivate: [AuthGuard, RoleGuard],
          data: {
            role: ['owner', 'librarian']
          },
          loadChildren: () =>
            import('./pages/settings/settings.module').then((m)=> m.SettingsModule)
        },
        {
          path: 'iam',
          canActivate: [AuthGuard, RoleGuard],
          data: {
            role: ['owner', 'librarian']
          },
          loadChildren: () =>
            import('./pages/users/users.module').then((m)=> m.UsersModule)
        },
        {
          path: 'audit-logs',
          canActivate: [AuthGuard, RoleGuard],
          data: {
            role: ['owner', 'librarian']
          },
          loadChildren: () =>
            import('./pages/audit-logs/audit-logs.module').then((m)=> m.AuditLogsModule)
        },
        {path: '**', redirectTo: 'loan'}
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
