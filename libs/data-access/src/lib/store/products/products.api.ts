import { Injectable } from '@angular/core';
import { BaseAPI } from '../../../base-api';
// noinspection ES6PreferShortImport
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsApi extends BaseAPI<IProduct> {
  constructor() {
    super('items');
  }
}
