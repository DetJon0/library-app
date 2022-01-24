import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import {AuthStore} from "../../../../core/services/auth.store";
import {User} from "../../../../models/user.model";

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
    private authStore: AuthStore
  ) {
  }

  form = this.fb.group({
    'email': ['', {
      validators: [
        Validators.required,
        Validators.minLength(6)]
    }],
    'password': [
      '',
      [Validators.required
      ]
    ]
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
        console.log(token);
        this.authService.me().pipe(take(1)).subscribe({
          next: (me: User) => {
            // morem me qe i referohet modelit te userit

            // Vendosim tokenin ne Behaviour Subject
            this.authStore.setToken(token);

            //nese useri ka zgjedhur remember me ruaje dhe ne localstorage
            // Vendosim te dhenat e profilit
            this.authStore.setUser(me)

            // Bejme navigate ne hyrje te aplikacionit
            this.router.navigateByUrl('/loan');
          },
          error: err => {
            console.log(err);
            //  shto nje toast qe shfaq err.message
          }
        })
      },
      error: err => {
        console.log(err);
        //  shto nje toast qe shfaq err.message
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
