import { PaginatedResult } from "../../../shared/PaginatedResult";
import { Item } from "../../../domain/models/Item";

export interface ISearchItemsUseCase {
  execute(query: string, page?: number, limit?: number): Promise<PaginatedResult<Item>>;
}
