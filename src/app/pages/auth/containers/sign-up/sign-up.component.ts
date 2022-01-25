import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {passwordFunction} from "../../utils/password-function";
import {take} from "rxjs";
import {User} from "../../../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {AuthStore} from "../../../../core/services/auth.store";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private authStore: AuthStore,
              private messageService: MessageService) { }

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
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signup(email, password).pipe(take(1)).subscribe({
      next: token => {
        console.log(token);
        this.authStore.setToken(token);
        localStorage.setItem('sign-up-token', token);
        this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Registered succesfully'})
        this.router.navigateByUrl('/loan');
      },
      error: err => {
        console.log(err);
        this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
      }

    })
  }

  onSigninRedirect() {
    this.router.navigate(['auth/signin']);
  }
}
