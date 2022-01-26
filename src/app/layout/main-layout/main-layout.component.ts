import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {AuthService} from "../../pages/auth/services/auth.service";
import {AuthStore} from "../../core/services/auth.store";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  items!: MegaMenuItem[];
  visibleSidebar1 = true;

  name = this.authStore.state.user?.firstName;

  constructor(private authService: AuthService, private authStore: AuthStore) { }

  onProfileLogout() {
    this.authService.logout();
  }

  ngOnInit() {

    this.items = [
      {
        label: this.name,
        items: [
          [
            {
              items: [{ label: 'Edit Profile' ,routerLink: '/auth/signup'},
                { label: 'Logout', command: () => this.onProfileLogout()}]
            }
          ]
        ]
      }
    ]
  }

}
