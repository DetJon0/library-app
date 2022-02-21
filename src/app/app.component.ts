import {Component, OnInit} from '@angular/core';
import {AuthStore} from "./core/services/auth.store";
import {take} from "rxjs";
import {User} from "./models/user.model";
import {AuthService} from "./pages/auth/services/auth.service";

@Component({
  selector: 'app-root',
  template: `
    <p-confirmDialog [breakpoints]="{'960px': '75vw', '640px': '100vw'}" [style]="{width: '35vw'}">
      Content
    </p-confirmDialog>
    <p-toast position="top-right" key="toast"></p-toast>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title = 'library-app';

  constructor(
    private authStore: AuthStore,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token')
    if(token) {
      this.authStore.setToken(token);
      this.authService.me().pipe(take(1)).subscribe({
        next: (me: User) => {
          this.authStore.setUser(me)
          console.log(this.authStore.state);
          // console.log(this.authStore.state.user?.roles);
          // const role = this.authStore.state.user?.roles
          // console.log(role?.some((res)=> res === 'owner'));

          // console.log(this.role?.includes('jane'));
          // if(role?.includes('owner')) {
          //   console.log(true);
          // } else {
          //   console.log(false);
          // }
        },
        error: err => {
          console.log(err);
          this.authStore.setToken(null);
          localStorage.removeItem('token');
          //  shto nje toast qe shfaq err.message
        }
      })
    }

  }
}
