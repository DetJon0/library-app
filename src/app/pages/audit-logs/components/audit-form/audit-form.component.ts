import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {formatDates} from "../../../loan/utils/formatDates.function";

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
    entityNames: '',
    createdByEmail: '',
    entityId: '',
    action: '',
  })

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
      action: this.form.value.action,
      timestampFromRange: this.timestampFromRange,
      timestampToRange: this.timestampToRange
    }

    console.log(object);

    this.searchQuery.emit(object)

  }

}
