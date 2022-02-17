import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {formatDates} from "../../../loan/utils/formatDates.function";
import {UsersParams} from "../../../users/services/users.store";
import {AuditParams} from "../../services/audit.store";

@Component({
  selector: 'app-audit-form',
  templateUrl: './audit-form.component.html',
  styleUrls: ['./audit-form.component.scss']
})
export class AuditFormComponent implements OnInit {

  timestampFromRange: string | null = '';
  timestampToRange: string | null = '';

  form = this.fb.group({
    period: '',
    entityNames: [''],
    createdByEmail: '',
    entityId: '',
    action: '',
  })

  @Input() set formValue(params: AuditParams) {
    this.form.patchValue({
      entityId: params.entityId,
      entityNames: params.entityNames,
      createdByEmail: params.createdByEmail,
      action: params.action,
      timestampFromRange: params.timestampFromRange,
      timestampToRange: params.timestampToRange,
    })
  }

  @Output() searchQuery = new EventEmitter<{}>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSearch() {
    console.log(this.form.value);

    if (this.form.value.period) {
      this.timestampFromRange = formatDates(this.form.value.period[0])
      this.timestampToRange = formatDates(this.form.value.period[1])
    }

    const object = {
      entityNames: this.form.value.entityNames,
      createdByEmail: this.form.value.createdByEmail,
      entityId: this.form.value.entityId,
      action: this.form.value.action,
      timestampFromRange: this.timestampFromRange,
      timestampToRange: this.timestampToRange
    }

    console.log(object);

    this.searchQuery.emit(object)

  }

  reset() {

    this.form.patchValue({
      period: null
    })

    this.searchQuery.emit({
      offset: 0,
      entityNames: null,
      createdByEmail: null,
      entityId: null,
      action: null,
    })
  }

}
