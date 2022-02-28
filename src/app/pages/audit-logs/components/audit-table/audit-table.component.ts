import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuditLogsModel} from "../../model/audit.model";
import {PaginationModel} from "../../../../shared/models/pagination.model";
import {SortModel} from "../../../../shared/models/sort.model";
import {ValuesModel} from "../../model/values.model";

@Component({
  selector: 'app-audit-table',
  templateUrl: './audit-table.component.html',
  styleUrls: ['./audit-table.component.scss']
})
export class AuditTableComponent implements OnInit {

  values!: ValuesModel;
  @Input() logs!: AuditLogsModel[];
  @Input() total!: number;
  @Input() rows!: number;

  @Input() loading!: boolean;

  displayResponsive!: boolean;

  cols = [
    {field: 'date', header: 'Date'},
    {field: 'userEmail', header: 'User Email'},
    {field: 'entity', header: 'Entity'},
    {field: 'action', header: 'Action'},
    {field: 'entityId', header: 'Entity ID'},
  ];

  @Output() paginationChanged = new EventEmitter<PaginationModel>();
  @Output() sortChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  paginate(event: PaginationModel) {
    console.log(event);
    this.paginationChanged.emit(event);
  }

  sort(event: SortModel) {
    // console.log(event);
    const sortQuery = `${event.sortField}_${event.sortOrder === 1 ? 'ASC' : 'DESC'}`

    if (!!event.sortField && !!event.sortOrder) this.sortChanged.emit(sortQuery);
  }

  showResponsiveDialog(rowData: AuditLogsModel) {
    // console.log(rowData);
    // console.log(rowData.values);
    this.values = rowData.values
    // console.log(this.values);
    this.displayResponsive = true;
  }

}
