import { IProduct } from '../interfaces/product.interface';

export class Product {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly price: number;
  public readonly quantity: number;
  public readonly unit: string;
  public readonly createdAt: Date;
  public readonly username: string;
  public readonly category: string;
  public readonly deliveryAddresses: string[];
  public readonly pictures: string[];

  constructor(product: IProduct) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.unit = product.unit;
    this.createdAt = product.createdAt;
    this.username = product.username;
    this.category = product.category;
    this.deliveryAddresses = product.deliveryAddresses ?? [];
    this.pictures = product.pictures ?? [];
  }
}
