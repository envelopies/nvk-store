export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  createdAt: Date;
  username: string;
  category: string;
  deliveryAddresses: string[];
  pictures: string[];
}
