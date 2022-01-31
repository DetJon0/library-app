import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  form = this.fb.group({
    isbn: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5) ]],
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    copies: [1, [Validators.required]]
  })

}
