import { inject, injectable } from "tsyringe";

import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { Item } from "../../../domain/models/Item";
import { PaginatedResult } from "../../../shared/PaginatedResult"; 
import { IGetAllItemsUseCase } from "./IGetAllItemsUseCase";

@injectable()
export class GetAllItemsUseCase implements IGetAllItemsUseCase {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(page = 1, limit = 10): Promise<PaginatedResult<Item>> {
    return this.itemRepository.getAllItems(page, limit);
  }
}
