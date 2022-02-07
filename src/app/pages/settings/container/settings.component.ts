import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    loanPeriodInDays: 4
  })

  ngOnInit(): void {
  }

  onSave() {
    console.log(this.form.value);
  }

}
