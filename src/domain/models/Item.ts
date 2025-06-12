export interface Item {
  id?: string;          // Optional for new item creation
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
