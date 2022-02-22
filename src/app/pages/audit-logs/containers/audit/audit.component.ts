import { Component, OnInit } from '@angular/core';
import {AuditStore} from "../../services/audit.store";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  email: string = ''

  constructor(public store: AuditStore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.store.load({})

    this.route.queryParams.subscribe({
      next: (params: Params) => {
        // console.log(params);
        this.email = params['createdByEmail']
        // console.log(this.email);

        if(this.email !== '') {
          this.store.load({
            createdByEmail: this.email
          })
        }
      }
    })

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
