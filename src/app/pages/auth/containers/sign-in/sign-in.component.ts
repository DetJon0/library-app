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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private authStore: AuthStore,
    private messageService: MessageService
  ) {
  }

  form = this.fb.group({
    email: ['test@gmail.com', {
      validators: [
        Validators.required,
        Validators.minLength(6)]
    }],
    password: [
      '12345678',
      [Validators.required
      ]
    ],
    rememberMe: [true]
  });

  onSignIn() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;

    // this.authService.login(email,password).pipe(
    //   tap(token => this.authStore.setToken(token)),
    //   concatMap(token => this.authService.me().pipe(me => this.authStore.setUser(me)))).subscribe()

    // modeli i behaviour subject do jete {token: string, user: User (modeli i response te me())

    //krijo interceptorin qe merr tokenin nga servisi qe ka behaviour subject qe te thirrja e dyte ta coje me token

    this.authService.login(email, password).pipe(take(1)).subscribe({
      next: token => {
        // console.log(token);
        // Vendosim tokenin ne Behaviour Subject
        this.authStore.setToken(token);
        this.authService.me().pipe(take(1)).subscribe({
          next: (me: User) => {
            // morem me qe i referohet modelit te userit

            //nese useri ka zgjedhur remember me ruaje dhe ne localstorage

            // Vendosim te dhenat e profilit
            this.authStore.setUser(me)
            if (!!this.form.get('rememberMe')?.value) {
              localStorage.setItem('token', token);
            }
            // Bejme navigate ne hyrje te aplikacionit
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Logged in succesfully'})
            this.router.navigateByUrl('/loan');
          },
          error: err => {
            console.log(err);
            this.authStore.setToken(null);
            localStorage.removeItem('token');
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'error', summary: err.message})
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
