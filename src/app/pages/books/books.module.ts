import {NgModule} from "@angular/core";
import { BooksComponent } from './containers/books/books.component';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import { NewBookComponent } from './containers/new-book/new-book.component';
import { ViewBookComponent } from './containers/view-book/view-book.component';
import { EditBookComponent } from './containers/edit-book/edit-book.component';
import { BooksFormComponent } from './components/books-form/books-form.component';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  }
]

@NgModule({
  imports:[
    RouterModule.forChild(routes),
    InputTextModule,
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
