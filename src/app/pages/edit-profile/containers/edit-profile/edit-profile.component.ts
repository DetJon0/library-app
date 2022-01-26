import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {take} from "rxjs";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  fileName = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  file = null;
  form = this.fb.group({
    firstName: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3)]
    }],
    fullName: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],
    phoneNumber: [
      '',
      Validators.required,
    ]
  });

  onCancel() {
    this.router.navigate(['loan'])
  }

  onFile(event: any) {
    console.log(event.target.files)

    const file:File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      this.authService.edit(formData).subscribe(response => console.log(response));

      this.authService.upload(formData).subscribe(response => console.log(response));

      // this.authService.me().pipe(take(1)).subscribe({
      //   next: (me: User) => {
      //     console.log(me);
      //   )}};

      this.authService.me().pipe(take(1)).subscribe({
        next: (me: User) => {
          console.log(me);
        }
      })
    }

  }

  onSave() {
    // console.log(this.file)
    console.log(this.form.value);
    //
    // const newCredentials = this.form.value;
    //
    // const credentials = {
    //   firstName: newCredentials.firstName,
    //   fullName: newCredentials.fullName,
    //   phoneNumber: newCredentials.phoneNumber,
    // }
    //
    // this.authService.edit(credentials).subscribe(response => console.log(response))
    //
    // console.log(credentials)
  }

}
