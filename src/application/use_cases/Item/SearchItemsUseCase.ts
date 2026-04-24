import { inject, injectable } from "tsyringe";

import { IItemRepository } from "../../../domain/repositories/IItemRepository"; 
import { PaginatedResult } from "../../../shared/PaginatedResult"; 
import { ISearchItemsUseCase } from "./ISearchItemsUseCase";
import { ItemResponseDTO } from "../../../domain/dtos/ItemDTO";
import { ItemMapper } from "../../mappers/ItemMapper";

@injectable()
export class SearchItemsUseCase implements ISearchItemsUseCase {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(query: string, page = 1, limit = 10): Promise<PaginatedResult<ItemResponseDTO>> {
    const result = await this.itemRepository.searchItems(query, page, limit);
    return ItemMapper.toPaginatedResponse(result);
  }
}
