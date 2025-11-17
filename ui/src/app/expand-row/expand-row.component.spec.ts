import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandRowComponent } from './expand-row.component';
import { GroceryService } from '../grocery.service';


describe('ExpandRowComponent', () => {
  let mockGroceryService: jasmine.SpyObj<GroceryService>;
  
  let component: ExpandRowComponent;
  let fixture: ComponentFixture<ExpandRowComponent>;

      mockGroceryService = jasmine.createSpyObj('GroceryService', ['getGroceryList']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandRowComponent ],
      providers: [
        { provide: GroceryService, useValue: mockGroceryService } // Provide the mock
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
