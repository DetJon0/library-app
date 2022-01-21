import { Component } from '@angular/core';
import { Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {passwordFunction} from "../../../utils/password-function";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent{
  constructor(private router: Router, private fb: FormBuilder) { }

  form = this.fb.group({
    'email': ['', {
      validators:[
        Validators.required,
        Validators.minLength(6)]
    }],
    'password':[
      '',
      [Validators.required
      ]
    ]
  });

  onSignupRedirect() {
      this.router.navigate(['auth/signup']);
  }

}
