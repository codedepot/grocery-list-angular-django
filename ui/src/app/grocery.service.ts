import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GroceryItem, GroceryItemPartial } from 'src/models/grocery';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private apiBasePath = "/api/v1/grocery"
  constructor(private httpClient: HttpClient) { }


  getGroceryList(): Observable<GroceryItem[]> {
    return this.httpClient.get(`${this.apiBasePath}`).pipe(map(value => value as GroceryItem[]));
  }

  addItem(item: GroceryItemPartial): Observable<GroceryItem>{
    return this.httpClient.post(`${this.apiBasePath}/`, item).pipe(map(value => value as GroceryItem));
  }

  updateItem(item: GroceryItemPartial): Observable<GroceryItem>{
    return this.httpClient.put(`${this.apiBasePath}/${item.id}/`, item).pipe(map(value => value as GroceryItem));
  }

  deleteItem(item: GroceryItemPartial): Observable<void>{
    return this.httpClient.delete(`${this.apiBasePath}/${item.id}/`).pipe(map(() => {}));
  }
}
