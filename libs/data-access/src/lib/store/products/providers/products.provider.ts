import { Provider } from '@angular/core';
import { ProductsApi } from '../products.api';
import { ProductsStore } from '../products.store';

export function provideProductsDataAccess(): Provider[] {
  return [ProductsApi, ProductsStore];
}
