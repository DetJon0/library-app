import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent implements OnInit {

  @Output() searchQuery = new EventEmitter<{}>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  form = this.fb.group({
    isbn: ['1234567891234'],
    title: ['book'],
    author: ['Writer'],
    status: [''],
  })

  onSearch() {
    console.log(this.form.value)
    this.searchQuery.emit(this.form.value)
  }

}
