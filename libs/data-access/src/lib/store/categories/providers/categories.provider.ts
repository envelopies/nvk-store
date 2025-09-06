import { CategoriesApi } from '../categories.api';
import { Provider } from '@angular/core';
import { CategoriesStore } from '../categories.store';

export function provideCategoriesDataAccess(): Provider[] {
  return [CategoriesApi, CategoriesStore];
}
