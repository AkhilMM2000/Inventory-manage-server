import { PaginatedResult } from "../../../shared/PaginatedResult";
import { ItemResponseDTO } from "../../../domain/dtos/ItemDTO";

export interface ISearchItemsUseCase {
  execute(query: string, page?: number, limit?: number): Promise<PaginatedResult<ItemResponseDTO>>;
}
