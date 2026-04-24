import { inject, injectable } from "tsyringe";

import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { PaginatedResult } from "../../../shared/PaginatedResult"; 
import { IGetAllItemsUseCase } from "./IGetAllItemsUseCase";
import { ItemResponseDTO } from "../../../domain/dtos/ItemDTO";
import { ItemMapper } from "../../mappers/ItemMapper";

@injectable()
export class GetAllItemsUseCase implements IGetAllItemsUseCase {
  constructor(
    @inject("IItemRepository")
    private _itemRepository: IItemRepository
  ) {}

  async execute(page = 1, limit = 10): Promise<PaginatedResult<ItemResponseDTO>> {
    const result = await this._itemRepository.getAllItems(page, limit);
    return ItemMapper.toPaginatedResponse(result);
  }
}
