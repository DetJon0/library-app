import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule} from "@angular/router";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from 'primeng/button';
import {MegaMenuModule} from 'primeng/megamenu';
import {ProfileAvatarComponent} from "./main-layout/components/profile-avatar.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AuthLayoutComponent,
    MainLayoutComponent,
    ProfileAvatarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        SidebarModule,
        ButtonModule,
        MegaMenuModule,
        SharedModule,
    ]
})
export class LayoutModule { }
