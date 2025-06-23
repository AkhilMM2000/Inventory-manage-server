import { PaginatedResult } from "../../shared/PaginatedResult";
import { Item } from "../models/Item";

export interface IItemRepository {
  
  create(data: Partial<Item>): Promise<Item>;
  reduceItemStock(itemId: string, quantity: number): Promise<void>;
 findById(id: string): Promise<Item| null>;
  
  getAllItems(page: number, limit: number): Promise<PaginatedResult<Item>>;
   update(id: string, updatedData: Partial<Item>): Promise<Item| null>;
    delete(id: string): Promise<boolean>;
  searchItems(query: string, page: number, limit: number): Promise<PaginatedResult<Item>>;
}
