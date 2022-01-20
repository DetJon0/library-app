import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent{
  constructor(private router: Router, private route: ActivatedRoute) { }

  onSignupRedirect() {
      this.router.navigate(['auth/signup']);
  }

}
