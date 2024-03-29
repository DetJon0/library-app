import { Component, OnInit } from '@angular/core';
import {BookResponse} from "../../model/book-response.model";
import {catchError, map, Observable, of, switchMap, take} from "rxjs";
import {BooksService} from "../../services/books.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {BooksStore} from "../../services/books.store";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

  book$: Observable<BookResponse | null> = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) =>
      id
        ? this.booksService.getBookById(id).pipe(
          catchError((err) => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'Book not found'})
            return of(null);
          })
        )
        : of(null)
    )
  );

  // loading: boolean = false;

  constructor(private booksService: BooksService, private route: ActivatedRoute,
              private messageService: MessageService, private router: Router,
              private confirmationService: ConfirmationService, private store: BooksStore) { }

  ngOnInit(): void {
  }

  onBookDelete() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if(id) {
      this.confirmationService.confirm({
        message: 'Are you sure?',
        accept: () => {
          this.booksService.singleDeleteBook(id).pipe(take(1)).subscribe({
            next: (res) => {
              this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Deleted succesfully'})
              this.store.load({})
              this.router.navigate(['../book'])
            },
            error: err => {
              this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
              console.log(err);
            }
          })
        }
      })
    }
  }
}
