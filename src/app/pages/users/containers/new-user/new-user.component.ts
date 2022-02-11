import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {NewUserData} from "../../model/new-user.model";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MessageService} from "primeng/api";
import {UsersStore} from "../../services/users.store";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  multipleEmailsDisplay: boolean = true;

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
    this.subscription = this.form.valueChanges.subscribe((value => {
      length = value.emails.length;
      // console.log(length);

      if(length > 1) {
        this.multipleEmailsDisplay = false
      } else {
        this.multipleEmailsDisplay = true
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
          this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'User with this email already exists'})
          console.log(err);
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
