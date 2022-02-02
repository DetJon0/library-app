import { Component, OnInit } from '@angular/core';
import {BookResponse} from "../../model/book-response.model";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {BooksService} from "../../services/books.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";

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

  constructor(private booksService: BooksService, private route: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
