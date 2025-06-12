import { Item } from "../models/Item";

export interface IItemRepository {
  createItem(item: Item): Promise<Item>;
  getItemById(id: string): Promise<Item | null>;
  getAllItems(): Promise<Item[]>;
  updateItem(id: string, updatedItem: Partial<Item>): Promise<Item | null>;
  deleteItem(id: string): Promise<boolean>;
  searchItems(query: string): Promise<Item[]>;
}
