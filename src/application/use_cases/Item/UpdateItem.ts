import { inject, injectable } from "tsyringe";
import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { Item } from "../../../domain/models/Item";
import { EntityNotFoundError } from "../../../domain/errors/DomainExceptions";
import { IUpdateItemUseCase } from "./IUpdateItemUseCase";

@injectable()
export class UpdateItemUseCase implements IUpdateItemUseCase {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(id: string, updatedItem: Partial<Item>): Promise<Item> {
    const item = await this.itemRepository.update(id, updatedItem);
   console.log(item,id,'reach here')
    if (!item) {
      throw new EntityNotFoundError("Item");
    }

    return item;
  }
}
