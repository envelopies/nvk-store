import { ICategory } from '../interfaces/category.interface';

export class Category {
  public readonly id: string;
  public readonly title: string;
  public readonly iconUrl: string;
  public readonly parentCategoryId: string;

  constructor(category: ICategory) {
    this.id = category.id;
    this.title = category.title;
    this.iconUrl = category.iconUrl;
    this.parentCategoryId = category.parentCategoryId;
  }
}
