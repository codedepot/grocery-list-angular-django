import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { GroceryService } from './grocery.service';
import { GroceryItem, GroceryItemPartial } from 'src/models/grocery';
import { Observable, from, BehaviorSubject, map, shareReplay, exhaustMap, Subscription, Subject, startWith, switchMap, filter } from 'rxjs';
import {MatButtonToggleChange} from '@angular/material/button-toggle'; 
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular';
  dataSource = [];
  displayedColumns = ["name", "priority", "purchased" , "count", "actions"];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  
  private subscriptions: Subscription[] = [];
  private readonly refresh$ = new Subject<void>();
  private readonly filter$ = new BehaviorSubject('');
  items$: Observable<GroceryItem[]> = new BehaviorSubject([]);
  filteredItems$: Observable<GroceryItem[]> = new BehaviorSubject([]);

  expandedId?: number;

  constructor(private groceryService: GroceryService) {}

  ngOnInit() {
    // triggered by refresh$ and reads from getGroceryList
    this.items$ = this.refresh$.pipe(startWith([]), switchMap(() => this.groceryService.getGroceryList()))

    // triggered by filter$ and filters items$
    this.filteredItems$ = this.filter$.pipe(switchMap(value => 
      this.items$.pipe(map(
        items => items.filter(item => item.name.includes(value.toLowerCase().trim()))
      ))  
    ));
  }

  applyFilter($event: any) {
    this.filter$.next($event.target.value);
  }

  togglePurchased(rowId: number, purchased: boolean, $event: MouseEvent) {
    $event.stopPropagation();
    this.subscriptions.push(this.groceryService.updateItem({
      id: rowId,
      purchased: !purchased,
    } as GroceryItemPartial).subscribe(() => {
      this.refresh$.next();
    }));
  }

  changePriority(rowId: number, $event: MatButtonToggleChange) {
    this.subscriptions.push(this.groceryService.updateItem({
      id: rowId,
      priority: $event.source.value,
    } as GroceryItemPartial).subscribe(() => {
      this.refresh$.next();
    }));
  }
  
  stopPropagation($event: MouseEvent) {
    $event.stopPropagation();
  }

  deleteItem(rowId: number, $event: MouseEvent) {
    $event.stopPropagation();
    this.subscriptions.push(this.groceryService.deleteItem({
      id: rowId,
    } as GroceryItemPartial).subscribe(() => {
      this.refresh$.next();
    }));
  }

  onSubmit() {
    this.refresh$.next();
  }

  /** Checks whether an element is expanded. */
  isExpanded(element: GroceryItem): boolean {
    return this.expandedId === element.id;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: GroceryItem) {
    this.expandedId = this.isExpanded(element) ? undefined : element.id;
  }

  updateCount(row: GroceryItem, delta: number, $event: MouseEvent) {
    $event.stopPropagation();

    if (row.count + delta > 0) {
      this.subscriptions.push(this.groceryService.updateItem({
        id: row.id,
        count: (row.count + delta)
      }).subscribe(() => {
        this.refresh$.next();
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
