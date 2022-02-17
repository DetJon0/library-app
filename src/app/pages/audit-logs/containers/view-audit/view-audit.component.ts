import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {BookResponse} from "../../../books/model/book-response.model";
import {AuditLogsModel} from "../../model/audit.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-audit',
  templateUrl: './view-audit.component.html',
  styleUrls: ['./view-audit.component.scss']
})
export class ViewAuditComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
