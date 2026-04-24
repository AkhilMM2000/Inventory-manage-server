import { inject, injectable } from "tsyringe";
import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { Item } from "../../../domain/models/Item";
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
import { IAddItemUseCase } from "./IAddItemUseCase";
import { AddItemRequestDTO, ItemResponseDTO } from "../../../domain/dtos/ItemDTO";
import { ItemMapper } from "../../mappers/ItemMapper";

@injectable()
export class AddItemUseCase implements IAddItemUseCase  {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(data: AddItemRequestDTO): Promise<ItemResponseDTO> {
    const { name, description = "", quantity, price } = data;

    const item: Item = {
      name,
      description,
      quantity,
      price,
    };

    const createdItem = await this.itemRepository.create(item);
    return ItemMapper.toResponse(createdItem);
  }
}
