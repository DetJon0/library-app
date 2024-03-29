import { Component, OnInit } from '@angular/core';
import {AuditStore} from "../../services/audit.store";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { exportExcel } from 'src/app/shared/export-excel/export-excel.function';
import {PaginationModel} from "../../../../shared/models/pagination.model";

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  constructor(public store: AuditStore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.store.load({})

    this.route.queryParams.subscribe({
      next: (params: Params) => {
        const createdByEmail = params['createdByEmail']

        if(createdByEmail !== '') {
          this.store.load({createdByEmail})
        }
      }
    })

  }

  exportFile(state: any) {
    exportExcel(state.data)
  }

  paginate(event: PaginationModel) {
    console.log(event);
    this.store.load({limit: event.rows, offset: event.first})
  }

  sort(orderBy: string): void {
    console.log(orderBy)
    this.store.load({orderBy, offset: 0});
  }

  searchParams(event: any) {
    console.log(event);
    this.store.load({
      timestampFromRange: event.timestampFromRange,
      timestampToRange: event.timestampToRange,
      entityNames: event.entityNames,
      entityId: event.entityId,
      createdByEmail: event.createdByEmail,
      action: event.action
    })
  }

}
