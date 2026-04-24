import { inject, injectable } from "tsyringe";
import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { Item } from "../../../domain/models/Item";
import { EntityNotFoundError } from "../../../domain/errors/DomainExceptions";
import { IGetItemByIdUseCase } from "./IGetItemById";
import { ItemResponseDTO } from "../../../domain/dtos/ItemDTO";
import { ItemMapper } from "../../mappers/ItemMapper";

@injectable()
export class GetItemByIdUseCase implements IGetItemByIdUseCase {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(id: string): Promise<ItemResponseDTO>{
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new EntityNotFoundError("Item");
    }
    return ItemMapper.toResponse(item);
  }
}
