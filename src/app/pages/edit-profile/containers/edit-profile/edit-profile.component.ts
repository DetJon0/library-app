import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  constructor(private fb: FormBuilder, private router: Router) { }

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

  onSave() {
    console.log(this.form.value)
  }

}
