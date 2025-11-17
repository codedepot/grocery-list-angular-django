import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import { GroceryService } from '../grocery.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import { FieldErrorComponent } from '../field-error/field-error.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { of } from 'rxjs';
import { GroceryItem } from 'src/models/grocery';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let mockGroceryService: jasmine.SpyObj<GroceryService>;
  

  beforeEach(async () => {
    mockGroceryService = jasmine.createSpyObj('GroceryService', ['addItem']);

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatExpansionModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [ AddItemComponent, FieldErrorComponent ],
      providers: [
        { provide: GroceryService, useValue: mockGroceryService }, // Provide the mock
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Add item', fakeAsync(() => {
    mockGroceryService.addItem.and.returnValue(of({} as GroceryItem))
    fixture.debugElement.nativeElement.querySelector('mat-panel-title').click();

    component.addItemForm.get('name')?.setValue('item-name');
    component.addItemForm.updateValueAndValidity();

    tick();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('.button-wrapper button').click();

    expect(mockGroceryService.addItem).toHaveBeenCalledWith(
      {
        name: "item-name",
        priority: 1,
        count: 1,
      }
    )
  }));
});
