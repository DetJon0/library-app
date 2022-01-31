import {NgModule} from "@angular/core";
import { BooksComponent } from './containers/books/books.component';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import { NewBookComponent } from './containers/new-book/new-book.component';
import { ViewBookComponent } from './containers/view-book/view-book.component';
import { EditBookComponent } from './containers/edit-book/edit-book.component';
import { BooksFormComponent } from './components/books-form/books-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputNumberModule} from 'primeng/inputnumber';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'new',
    component: NewBookComponent,
  },
]

@NgModule({
  imports:[
    RouterModule.forChild(routes),
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule
  ],
  declarations: [
    BooksComponent,
    NewBookComponent,
    ViewBookComponent,
    EditBookComponent,
    BooksFormComponent
  ]
})
export class BooksModule {

}
