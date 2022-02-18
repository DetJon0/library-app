import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {AuthStore} from "../../../../core/services/auth.store";
import {MessageService} from "primeng/api";
import {take} from "rxjs";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  fileName = '';
  file = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private messageService: MessageService,
              private authStore: AuthStore) {
  }

  form = this.fb.group({
    firstName: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3)]
    }],
    lastName: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3)]
      }
    ],
    phoneNumber: [
      '',
      Validators.required,
    ]
  });

  ngOnInit() {
    this.authService.me().subscribe((user) => {
     console.log(user);
     this.form.patchValue({
       firstName: user?.firstName,
       lastName: user?.fullName,
       phoneNumber: user?.phoneNumber,
     })
    });


  }


  onCancel() {
    this.router.navigate(['loan'])
  }

  onFile(event: any) {
    console.log(event.target.files)

    // const file:File = event.target.files[0];

    // if (file) {
    //
    //   this.fileName = file.name;
    //
    //   const formData = new FormData();
    //
    //   formData.append("thumbnail", file);
    //
    //   this.authService.edit(formData).subscribe(response => console.log(response));
    //
    //   this.authService.upload(formData).subscribe(response => console.log(response));


      // this.authService.me().pipe(take(1)).subscribe({
      //   next: (me: User) => {
      //     console.log(me);
      //   }
      // })
    // }

  }

  onSave() {
    // console.log(this.file)
    console.log(this.form.value);

    const newCredentials = this.form.value;

    const credentials = {
      firstName: newCredentials.firstName,
      lastName: newCredentials.lastName,
      phoneNumber: newCredentials.phoneNumber,
    }

    this.authService.edit(credentials).subscribe(response => console.log(response))
    // this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Profile updated succesfully'})

    // this.authService.me().pipe(take(1)).subscribe({
    //   next: (me: User) => {
    //     me.firstName = newCredentials.firstName;
    //     me.lastName = newCredentials.lastName;
    //     me.phoneNumber = newCredentials.phoneNumber;
    //
    //     this.authStore.setUser(me);
    //     console.log(this.authStore.state.user?.firstName);
    //   }
    // })
    // }

    this.authService.me().pipe(take(1)).subscribe((user) => {
      user.firstName = newCredentials.firstName;
      user.lastName = newCredentials.lastName;
      user.phoneNumber = newCredentials.phoneNumber;

      this.authStore.setUser(user);
      console.log(user);
      console.log(this.authStore.state);
      console.log(this.authStore.state.user?.firstName);
    });

    console.log(credentials)
  }

}
