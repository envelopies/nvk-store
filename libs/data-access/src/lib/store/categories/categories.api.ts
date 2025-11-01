import { Injectable } from '@angular/core';
import { ICategory } from './interfaces/category.interface';
import { BaseAPI } from '../../../base-api';

@Injectable()
export class CategoriesApi extends BaseAPI<ICategory> {
  constructor() {
    super('categories');
  }
}
