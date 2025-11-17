import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.css']
})
export class FieldErrorComponent {

  @Input()
  group?: FormGroup;

  @Input()
  controlName: string = '';

  constructor() { }

  getControl() {
    return this.group?.get(this.controlName);
  }
}
