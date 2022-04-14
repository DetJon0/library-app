import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import {AuthStore} from "../../../../core/services/auth.store";
import {User} from "../../../../models/user.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private authStore: AuthStore,
    private messageService: MessageService
  ) {
  }

  form = this.fb.group({
    email: ['test2@gmail.com', {
      validators: [
        Validators.required,
        Validators.minLength(6)]
    }],
    password: [
      'A123456$',
      [Validators.required
      ]
    ],
    rememberMe: [true]
  });

  onSignIn() {

    this.isLoading = true;

    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.authService.login(email, password).pipe(take(1)).subscribe({
      next: token => {
        // console.log(token);
        // Vendosim tokenin ne Behaviour Subject
        this.authStore.setToken(token);

        this.authService.me().pipe(take(1)).subscribe({
          next: (me: User) => {
            console.log(me);
            this.authStore.setUser(me)
            if (!!this.form.get('rememberMe')?.value) {
              localStorage.setItem('token', token);
            }
            this.router.navigateByUrl('/loan');
            this.isLoading = false;
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Logged in succesfully'})
          },
          error: err => {
            this.isLoading = false;
            console.log(err);
            this.authStore.setToken(null);
            localStorage.removeItem('token');
            // this.isLoading = false;
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
          }
        })
      },
      error: err => {
        console.log(err);
        this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'Sorry, we don\'t recognize your credentials'})
      }

    })
  }

  onForgotPassword() {
    this.router.navigate(['auth/forgot-password'])
  }

  onSignupRedirect() {
    this.router.navigate(['auth/signup']);
  }

}
