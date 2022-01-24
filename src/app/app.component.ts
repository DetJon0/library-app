import {Component, OnInit} from '@angular/core';
import {AuthStore} from "./core/services/auth.store";
import {take} from "rxjs";
import {User} from "./models/user.model";
import {AuthService} from "./pages/auth/services/auth.service";

@Component({
  selector: 'app-root',
  template: `
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

//  n eon init do kerkosh per token ne localstorage nese ka bej dhe thirrjen me dh evendose ne behaviour subject nese jo mos bej asgje
//  nje alternative tjeter eshte qe ne local storage te ruash dhe userin njesoj formatin sic e pranon behaviour subject dhe nese ka i jep next behaviour subject dhe ske nevoje te besh nje thirrje te dyte
}
