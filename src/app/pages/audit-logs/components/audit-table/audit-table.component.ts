import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuditLogsModel} from "../../model/audit.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-audit-table',
  templateUrl: './audit-table.component.html',
  styleUrls: ['./audit-table.component.scss']
})
export class AuditTableComponent implements OnInit {

  values: {} ='';
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

  constructor(private router: Router, private route: ActivatedRoute) { }

  displayResponsive!: boolean;

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

  showResponsiveDialog(rowData: any) {
    console.log(rowData);
    console.log(rowData.values);
    this.values = rowData.values
    console.log(this.values);
    this.displayResponsive = true;
  }

}
