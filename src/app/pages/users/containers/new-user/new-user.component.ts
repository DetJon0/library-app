import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {NewUserData} from "../../model/new-user.model";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MessageService} from "primeng/api";
import {UsersStore} from "../../services/users.store";
import {emailValidator} from "../../utils/emailValidator";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  multipleEmailsDisplay: boolean = true;
  errorMessage: string = ''

  subscription: Subscription | undefined;

  form = this.fb.group({
    emails: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    roles: ['', Validators.required],
  })

  roles = [
    {label: 'Member', value: 'member'},
    {label: 'Librarian', value: 'librarian'},
  ];

  constructor(private fb: FormBuilder, private usersService: UsersService, private route: ActivatedRoute,
              private messageService: MessageService, private router: Router, private store: UsersStore) { }

  ngOnInit() {
    this.subscription = this.form.get('emails')?.valueChanges.subscribe((value => {
      length = value.length;
      console.log(length);

      if(length > 1) {
        this.multipleEmailsDisplay = false
        this.form.get('firstName')?.setValidators(null);
        this.form.get('lastName')?.setValidators(null);
        this.form.get('phoneNumber')?.setValidators(null);

        this.form.patchValue({
          firstName: null,
          lastName: null,
          phoneNumber: null,
        })

      } else {
        this.multipleEmailsDisplay = true

        this.form.get('firstName')?.setValidators(Validators.required);
        this.form.get('lastName')?.setValidators(Validators.required);
        this.form.get('phoneNumber')?.setValidators(Validators.required);

        // this.form.patchValue({
        //   firstName: '',
        //   lastName: '',
        //   phoneNumber: '',
        // })

      }

    }))
  }

  onSave() {
    console.log(this.form.value);
    console.log(this.form.value.emails);

    const user: NewUserData = {
      data: this.form.value,
    }
    console.log(user);

    this.usersService.postUser(user).subscribe({
        next: (res) => {
          this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Created succesfully'})
          this.store.load({})
          this.router.navigateByUrl('/iam');
        },
        error: (err) => {
          this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'Error! Please use a valid email'})
          console.log(err);
        }
      }
    )
  }

  testMail(event: any) {
    this.errorMessage = ''; // reinitialize error message

    if(!this.validateEmail(event.value)) {
      this.errorMessage = event.value + ' is not a valid mail address !'; // display message
      // this.form.get('emails')?.pop(); // remove last entry from emails array of strings
    }
  }

  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
