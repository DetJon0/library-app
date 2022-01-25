import { Component } from '@angular/core';
import {AuthStore} from "../../../../core/services/auth.store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent {

  constructor(private authStore: AuthStore, private router: Router) { }

  onLogout() {
    this.authStore.state.user = null;
    localStorage.clear();
    this.router.navigate(['/auth/signin']);
  }

}
