import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, pluck, switchMap, take, tap} from "rxjs";
import {LoanBookResponse} from "../../../loan/model/loan-book-response.model";
import {UsersResponse} from "../../model/user-response.model";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserDisable} from "../../model/user-disable.model";
import {UsersStore} from "../../services/users.store";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  // idValue: string[] = [];

  userId: string = ''
  user$!: Observable<UsersResponse | null> ;

  // user$: Observable<UsersResponse | null> = this.route.params.pipe(
  //   pluck('id'),
  //   tap((id: string) => this.userId = id),
  //   switchMap((id) =>
  //     id
  //       ? this.usersService.getUserById(id).pipe(
  //         catchError((err) => {
  //           this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'User not found'})
  //           return of(null);
  //         })
  //       )
  //       : of(null)
  //   )
  // );

  constructor(private usersService: UsersService, private route: ActivatedRoute, private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private store: UsersStore) { }

  ngOnInit() {
    this.user$ = this.getUser();
  }

  onStatus(status: boolean) {

      const userData: UserDisable = {
        ids: [this.userId],
        disabled: status,
      }

    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.usersService.userStatusChange(userData).pipe(take(1)).subscribe({
          next: (res) => {
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Done succesfully'})
            this.user$ = this.getUser();
          },
          error: err => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
            console.log(err);
          }
        })
      }
    })

      // this.usersService.userStatusChange(userData).subscribe();
  }

  getUser(): Observable<UsersResponse | null> {
    return this.route.params.pipe(
      pluck('id'),
      tap((id: string) => this.userId = id),
      switchMap((id) =>
        id
          ? this.usersService.getUserById(id).pipe(
            catchError((err) => {
              this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'User not found'})
              return of(null);
            })
          )
          : of(null)
      )
    );
  }


}
