import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {formatDate} from "@angular/common";
import {LoansParams} from "../../../loan/services/loans.store";
import {UsersParams} from "../../services/users.store";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  createdAtFirst: string | null = '';
  createdAtSecond: string | null = '';

  status = [
    { label: '--', value: null },
    { label: 'Enabled', value: 'enabled' },
    { label: 'Disabled', value: 'disabled' }
  ];

  role = [
    { label: '--', value: null },
    { label: 'Librarian', value: 'librarian' },
    { label: 'Member', value: 'member' }
  ];

  @Input() set formValue(params: UsersParams) {
    this.form.patchValue({
      id: params.id,
      email: params.email,
      name: params.name,
      status: params.status,
      createdAtFirst: params.createdAtFirst,
      createdAtSecond: params.createdAtSecond,
      role: params.role,
    })
  }

  form = this.fb.group({
    id: null,
    createdAt: null,
    email: null,
    name: null,
    status: null,
    role: null,
  });

  @Output() searchQuery = new EventEmitter<{}>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSearch() {
    // console.log(this.form.value);
    console.log(this.form.value);

    if (this.form.value.createdAt) {
      this.createdAtFirst = this.formatDates(this.form.value.createdAt[0])
      this.createdAtSecond = this.formatDates(this.form.value.createdAt[1])
    }

    const object = {
      id: this.form.value.id,
      email: this.form.value.email,
      name: this.form.value.name,
      status: this.form.value.status,
      createdAtFirst: this.createdAtFirst,
      createdAtSecond: this.createdAtSecond,
      role: this.form.value.role,
    }

    console.log(object);
    this.searchQuery.emit(object)
  }

  formatDates(date: string) {
    let dateFormatted = null;
    if (date) {
      dateFormatted = formatDate(date, 'yyyy-MM-ddThh:mm:ss', 'en_US')
    }
    return dateFormatted;
  }

}