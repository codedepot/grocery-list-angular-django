import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { GroceryItem } from 'src/models/grocery';
import {FormControl} from '@angular/forms';
import { GroceryService } from '../grocery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expand-row',
  templateUrl: './expand-row.component.html',
  styleUrls: ['./expand-row.component.css']
})
export class ExpandRowComponent implements OnInit, OnDestroy {
  @Input()
  item?: GroceryItem;
  comments: FormControl = new FormControl();
  private subscriptions: Subscription[] = [];

  @Output()
  onSubmit = new EventEmitter<void>();

  constructor(private groceryService: GroceryService) { }

  ngOnInit(): void {
    this.comments = new FormControl(this.item?.comments)
  }

  updateComments() {
    this.groceryService.updateItem({
      id: this.item?.id,
      comments: this.comments.value

    }).subscribe(() => {
      this.onSubmit.emit();
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
