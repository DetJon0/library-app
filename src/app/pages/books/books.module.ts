import {NgModule} from "@angular/core";
import { BooksComponent } from './containers/books/books.component';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import { NewBookComponent } from './containers/new-book/new-book.component';
import { ViewBookComponent } from './containers/view-book/view-book.component';
import { EditBookComponent } from './containers/edit-book/edit-book.component';
import { BooksFormComponent } from './components/books-form/books-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputNumberModule} from 'primeng/inputnumber';
import { BooksTableComponent } from './components/books-table/books-table.component';
import {TableModule} from 'primeng/table';
import {SliderModule} from "primeng/slider";
import {DialogModule} from "primeng/dialog";
import {MultiSelectModule} from "primeng/multiselect";
import {ContextMenuModule} from "primeng/contextmenu";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {ProgressBarModule} from "primeng/progressbar";
import {BooksStore} from "./services/books.store";

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
    InputNumberModule,
    TableModule,
    FormsModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    ProgressBarModule
  ],
  declarations: [
    BooksComponent,
    NewBookComponent,
    ViewBookComponent,
    EditBookComponent,
    BooksFormComponent,
    BooksTableComponent
  ],
  providers: [
    BooksStore
  ]
})
export class BooksModule {

}
