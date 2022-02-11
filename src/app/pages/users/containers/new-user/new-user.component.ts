import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  form = this.fb.group({
    emails: [''],
    firstName: [''],
    lastName: [''],
    phoneNumber: [''],
    roles: [''],
  })

  roles = [
    {label: 'Member', value: 'member'},
    {label: 'Librarian', value: 'librarian'},
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSave() {
    console.log(this.form.value);
  }

}
