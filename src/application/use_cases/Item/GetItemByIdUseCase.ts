import { inject, injectable } from "tsyringe";
import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { Item } from "../../../domain/models/Item";
import { EntityNotFoundError } from "../../../domain/errors/DomainExceptions";
import { IGetItemByIdUseCase } from "./IGetItemById";

@injectable()
export class GetItemByIdUseCase implements IGetItemByIdUseCase {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(id: string): Promise<Item>{
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new EntityNotFoundError("Item");
    }
    return item;
  }
}
