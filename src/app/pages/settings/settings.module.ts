import {NgModule} from "@angular/core";
import {SettingsComponent} from "./container/settings.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {InputNumberModule} from "primeng/inputnumber";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

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
        InputNumberModule,
        ReactiveFormsModule,
        SharedModule
    ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {

}
