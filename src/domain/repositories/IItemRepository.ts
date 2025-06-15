import { PaginatedResult } from "../../shared/PaginatedResult";
import { Item } from "../models/Item";

export interface IItemRepository {
  createItem(item: Item): Promise<Item>;
  reduceItemStock(itemId: string, quantity: number): Promise<void>;

  getItemById(id: string): Promise<Item | null>;
  getAllItems(page: number, limit: number): Promise<PaginatedResult<Item>>;
  updateItem(id: string, updatedItem: Partial<Item>): Promise<Item | null>;
  deleteItem(id: string): Promise<boolean>;
  searchItems(query: string, page: number, limit: number): Promise<PaginatedResult<Item>>;
}
