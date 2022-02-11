import { Component, OnInit } from '@angular/core';
import {catchError, Observable, of, pluck, switchMap, tap} from "rxjs";
import {LoanBookResponse} from "../../../loan/model/loan-book-response.model";
import {UsersResponse} from "../../model/user-response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  roles = [
    {label: 'Member', value: 'member'},
    {label: 'Librarian', value: 'librarian'},
  ];

  form = this.fb.group({
    id: [''],
    email: [''],
    firstName: [''],
    lastName: [''],
    phoneNumber: [''],
    roles: [''],
  })

  book$: Observable<UsersResponse | null> = this.route.params.pipe(
    pluck('id'),
    switchMap((id: string) =>
      id ? this.usersService.getUserById(id).pipe(tap((response) => {
            console.log(response.roles[0]);
            this.form.patchValue({
              id: response.id,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              phoneNumber: response.phoneNumber,
              roles: response.roles,
            });

          }), catchError((err) => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'User not found'})
            this.router.navigateByUrl('/iam');
            return of(null);
          })
        )
        : of(null)
    )
  )

  constructor(private route: ActivatedRoute, private router: Router,
              private usersService: UsersService,
              private fb: FormBuilder,
              private messageService: MessageService) { }

  ngOnInit(): void {

  }

  get statusValue() {
    return this.form.get('roles')?.value;
  }

  onSave() {
    console.log(this.form.value);
  }

}
