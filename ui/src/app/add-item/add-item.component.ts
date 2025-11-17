import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { GroceryService } from '../grocery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Output()
  onSubmit = new EventEmitter<void>();

  expanded: boolean = false;
  addItemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(2000)]),
    priority: new FormControl(1, [Validators.required, Validators.min(0),  Validators.max(2)]),    
    count: new FormControl(1, [Validators.required, Validators.min(1)]),    
  });
  
    constructor(private groceryService: GroceryService) { }

  ngOnInit(): void {
    this.expanded = localStorage["expanded"] === "true";
  }

  toggleExpand(newState: boolean) {
    this.expanded = newState;
    localStorage["expanded"] = newState;
  }

  submit() {
    this.subscriptions.push(this.groceryService.addItem( this.addItemForm.value).subscribe(() => {
      this.onSubmit.emit();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
