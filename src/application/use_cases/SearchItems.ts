import { inject, injectable } from "tsyringe";

import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { Item } from "../../domain/models/Item";
import { PaginatedResult } from "../../shared/PaginatedResult"; 

@injectable()
export class SearchItems {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(query: string, page = 1, limit = 10): Promise<PaginatedResult<Item>> {
    return this.itemRepository.searchItems(query, page, limit);
  }
}
