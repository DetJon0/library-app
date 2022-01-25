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

  // public showInitials = false;
  // public initials!: string;
  // public circleColor!: string;
  //
  // private colors = [
  //   '#EB7181', // red
  //   '#468547', // green
  //   '#FFD558', // yellow
  //   '#3670B2', // blue
  // ];

  name = this.authStore.state.user?.firstName;
  // photoUrl = this.authStore.state.user?.avatars;

  constructor(private authService: AuthService, private authStore: AuthStore) { }

  onProfileLogout() {
    this.authService.logout();
  }

  ngOnInit() {

    // if (!this.photoUrl) {
    //   this.showInitials = true;
    //   this.createInititals();
    //
    //   const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
    //   this.circleColor = this.colors[randomIndex];
    // }

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

  // private createInititals(): void {
  //   let initials = '';
  //
  //   for (let i = 0; i < this.name?.length; i++) {
  //     if (this.name?.charAt(i) === '') {
  //       continue;
  //     }
  //
  //     if (this.name?.charAt(i) === this.name?.charAt(i).toUpperCase()) {
  //       initials += this.name?.charAt(i);
  //
  //       if (initials.length === 2) {
  //         break;
  //       }
  //     }
  //   }
  //
  //   this.initials = initials;
  // }

}
