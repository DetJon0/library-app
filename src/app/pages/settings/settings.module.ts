import {NgModule} from "@angular/core";
import {SettingsComponent} from "./container/settings.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {

}
