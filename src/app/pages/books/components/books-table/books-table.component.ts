import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import { BooksStore} from "../../services/books.store";
import {BookResponse} from "../../model/book-response.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {PaginationModel} from "../../../../shared/models/pagination.model";
import {SortModel} from "../../../../shared/models/sort.model";

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {

  @Input() books!: Book[];
  @Input() total!: number;
  @Input() rows!: number;

  @Input() loading!: boolean;

  cols = [
    {field: 'isbn', header: 'ISBN'},
    {field: 'title', header: 'Title'},
    {field: 'author', header: 'Author'},
  ];

  @Output() paginationChanged = new EventEmitter<PaginationModel>();
  @Output() sortChanged = new EventEmitter<string>();
  @Output() bookChanged = new EventEmitter<BookResponse[]>();

  selectedBooks: BookResponse[] = [];

  constructor(private booksService: BooksService, private store: BooksStore, private messageService: MessageService,
              private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    // console.log(this.selectedBooks);
  }

  selectionChange(event: BookResponse[]) {
    console.log(event);
    this.bookChanged.emit(event)
  }

  paginate(event: PaginationModel) {
    console.log(event);
    this.paginationChanged.emit(event);
  }

  sort(event: SortModel) {
    const sortQuery = `${event.sortField}_${event.sortOrder === 1 ? 'ASC' : 'DESC'}`

    if (!!event.sortField && !!event.sortOrder) this.sortChanged.emit(sortQuery);
  }

  onDeleteConfirmation(rowData: BookResponse) {
    // console.log(rowData);
    // console.log(rowData.id);
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.booksService.singleDeleteBook(rowData.id).subscribe({
          next: (res) => {
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Deleted succesfully'})
            this.store.load({})
          },
          error: err => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
            console.log(err);
          }
        })
      }
    })
  }

  onView(rowData: BookResponse) {
    console.log(rowData);
    let id = rowData.id;
    console.log(id);

    if (id) {
      this.router.navigate([id], { relativeTo: this.route });
    }
  }

  onEdit(rowData: BookResponse) {
    console.log(rowData);
    let id = rowData.id;
    // console.log(id);

    if (id) {
      this.router.navigate([id, 'edit'], { relativeTo: this.route });
    }
  }

}
