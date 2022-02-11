import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {LoanBookResponse} from "../../../loan/model/loan-book-response.model";
import {UsersResponse} from "../../model/user-response.model";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  user$: Observable<UsersResponse | null> = this.route.paramMap.pipe(
    map((params) => params.get('id')),
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

  constructor(private usersService: UsersService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
