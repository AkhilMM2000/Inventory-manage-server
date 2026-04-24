import { PaginatedResult } from "../../../shared/PaginatedResult";
import { ItemResponseDTO } from "../../../domain/dtos/ItemDTO";

export interface IGetAllItemsUseCase {
  execute(page?: number, limit?: number): Promise<PaginatedResult<ItemResponseDTO>>;
}
