import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {BookModel} from "../../model/book.model";

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  books: BookModel[] = [];

  constructor(private fb: FormBuilder, private bookService: BooksService) { }

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

    const data: BookModel = {
      isbn: newData.isbn,
      title: newData.title,
      author: newData.author,
      numberOfCopies: newData.numberOfCopies,
    }

    this.bookService.postBook(data).subscribe((res)=>
    {
      this.books.push(res);
    })
    console.log(this.books);
  }

}
