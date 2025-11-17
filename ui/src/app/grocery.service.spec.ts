import { TestBed } from '@angular/core/testing';

import { GroceryService } from './grocery.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GroceryServiceService', () => {
  let service: GroceryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Crucial for providing HttpClient
      providers: [
        GroceryService
      ]
    });
    service = TestBed.inject(GroceryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no outstanding requests are present
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
