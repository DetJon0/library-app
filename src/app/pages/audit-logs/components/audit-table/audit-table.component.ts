import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuditLogsModel} from "../../model/audit.model";

@Component({
  selector: 'app-audit-table',
  templateUrl: './audit-table.component.html',
  styleUrls: ['./audit-table.component.scss']
})
export class AuditTableComponent implements OnInit {

  @Input() logs!: AuditLogsModel[];
  @Input() total!: number;
  @Input() rows!: number;

  @Input() loading!: boolean;

  cols = [
    {field: 'date', header: 'Date'},
    {field: 'userEmail', header: 'User Email'},
    {field: 'entity', header: 'Entity'},
    {field: 'action', header: 'Action'},
    {field: 'entityId', header: 'Entity ID'},
  ];

  @Output() paginationChanged = new EventEmitter<number>();
  @Output() sortChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  paginate(event: any) {
    this.paginationChanged.emit(event);
  }

  sort(event: any) {
    // console.log('ktu', event);
    const sortQuery = `${event.sortField}_${event.sortOrder === 1 ? 'ASC' : 'DESC'}`

    if (!!event.sortField && !!event.sortOrder) this.sortChanged.emit(sortQuery);
  }

}
