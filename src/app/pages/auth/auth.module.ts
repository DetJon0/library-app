import {NgModule} from "@angular/core";
import {LayoutModule} from "../../layout/layout.module";
import {AuthLayoutComponent} from "../../layout/auth-layout/auth-layout.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: AuthLayoutComponent },
      {
        path: 'signin',
        component: AuthLayoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [LayoutModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModule {

}
