import { Component, OnInit } from '@angular/core';
import {AuditStore} from "../../services/audit.store";

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  constructor(public store: AuditStore) { }

  ngOnInit() {
    this.store.load({})
  }

  paginate(event: any) {
    this.store.load({limit: event.rows, offset: event.first})
  }

  sort(orderBy: string): void {
    console.log(orderBy)
    this.store.load({orderBy, offset: 0});
  }

  searchParams(event: any) {
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
