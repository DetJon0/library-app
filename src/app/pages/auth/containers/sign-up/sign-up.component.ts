import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {passwordFunction} from "../../utils/password-function";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private router: Router, private fb: FormBuilder) { }
  submitted = false;

  form = this.fb.group({
    'email': ['', {
      validators:[
        Validators.required,
        Validators.minLength(6)]
    }],
    'password':[
      '',
      [Validators.required, Validators.minLength(6),
        passwordFunction()
      ]
    ]
  });

  onSignup() {
    this.submitted= true;
    console.log(this.form);
    console.log(this.form.value);
  }

  onSigninRedirect() {
    this.router.navigate(['auth/signin']);
  }
}
