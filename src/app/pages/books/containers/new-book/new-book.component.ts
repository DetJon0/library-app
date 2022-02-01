import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  books: Book[] = [];

  constructor(private fb: FormBuilder, private bookService: BooksService, private router: Router) {
  }

  ngOnInit(): void {
  }

  form = this.fb.group({
    isbn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    title: ['', [Validators.required, Validators.minLength(4)]],
    author: ['', [Validators.required, Validators.minLength(4)]],
    numberOfCopies: [1, [Validators.required]]
  })

  onSave() {
    console.log(this.form);
    console.log(this.form.value);

    const newData = this.form.value;

    const data: Book = {
      isbn: newData.isbn,
      title: newData.title,
      author: newData.author,
      numberOfCopies: newData.numberOfCopies,
    }

    this.bookService.postBook(data).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/book');
        },
        error: (err) => {
          console.log(err);
        }
      }
    )

  }

}
