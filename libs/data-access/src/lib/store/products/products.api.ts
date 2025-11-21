import { Injectable } from '@angular/core';
import { BaseAPI } from '../../../base-api';
import { IProduct } from './interfaces/product.interface';
import { Observable } from 'rxjs';
import { environment } from '@nvk-store/core';

@Injectable()
export class ProductsApi extends BaseAPI<IProduct> {
  constructor() {
    super('items');
  }

  public getProductsSelection(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.apiUrl}/items/random`);
  }
}
