import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-audit-form',
  templateUrl: './audit-form.component.html',
  styleUrls: ['./audit-form.component.scss']
})
export class AuditFormComponent implements OnInit {

  form = this.fb.group({
    period: '',
    entities: '',
    userEmail: '',
    entityId: '',
    action: '',
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSearch() {
    console.log(this.form.value);
  }

}
