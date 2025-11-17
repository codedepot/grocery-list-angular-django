import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GroceryService } from './grocery.service';
import { of } from 'rxjs';
import { GroceryItem } from 'src/models/grocery';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { AddItemComponent } from './add-item/add-item.component';

describe('AppComponent', () => {
  let mockGroceryService: jasmine.SpyObj<GroceryService>;
  beforeEach(async () => {
    mockGroceryService = jasmine.createSpyObj('GroceryService', ['getGroceryList', 'updateItem', 'deleteItem']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            MatPaginatorModule,
            MatFormFieldModule,
            MatInputModule,
            MatTableModule,
            MatToolbarModule,
            HttpClientModule,
            MatSlideToggleModule,
            MatButtonToggleModule,
            MatIconModule,
            MatButtonModule,
            MatExpansionModule,
            ReactiveFormsModule,
            MatDividerModule,
      ],
      declarations: [
            AppComponent,
            AddItemComponent
      ],
      providers: [
        { provide: GroceryService, useValue: mockGroceryService } // Provide the mock
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('Grocery List');
  });

  it('should display grocery items', fakeAsync(() => {
    mockGroceryService.getGroceryList.and.returnValue(of<GroceryItem[]>([
      {
        name: "item1",
        
      } as GroceryItem
    ]))
    const fixture = TestBed.createComponent(AppComponent);
    tick();
    fixture.detectChanges();
   
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table td.mat-column-name')?.textContent).toContain('item1');
  }));

  it('should be able to change priority', fakeAsync(() => {
    mockGroceryService.getGroceryList.and.returnValue(of<GroceryItem[]>([
      {
        id: 1,
        priority: 1,
        name: "item1",
        
      } as GroceryItem
    ]))
    const fixture = TestBed.createComponent(AppComponent);
    tick();
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('table mat-button-toggle button').click();
    expect(mockGroceryService.updateItem).toHaveBeenCalledWith(
      {
        id: 1,
        priority: 0
      }
    )
  }));

  it('should be able to delete', fakeAsync(() => {
    mockGroceryService.getGroceryList.and.returnValue(of<GroceryItem[]>([
      {
        id: 1,
        priority: 1,
        name: "item1",
        
      } as GroceryItem
    ]))
    const fixture = TestBed.createComponent(AppComponent);
    tick();
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('button[aria-label="delete"]').click();
    expect(mockGroceryService.deleteItem).toHaveBeenCalledWith(
      {
        id: 1,
      }
    )
  }));

});
