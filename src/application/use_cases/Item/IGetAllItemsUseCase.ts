import { Item } from "../../../domain/models/Item";
import { PaginatedResult } from "../../../shared/PaginatedResult";

export interface IGetAllItemsUseCase {
  execute(page?: number, limit?: number): Promise<PaginatedResult<Item>>;
}
