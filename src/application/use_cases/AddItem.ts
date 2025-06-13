import { inject, injectable } from "tsyringe";

import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { Item } from "../../domain/models/Item";
import { AppError } from "../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../constants/ErrorMessage";

interface AddItemDTO {
  name: string;
  description?: string;
  quantity: number;
  price: number;
}

@injectable()
export class AddItem {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(data: AddItemDTO): Promise<Item> {
    const { name, description = "", quantity, price } = data;

    if (!name || quantity < 0 || price < 0) {
      throw new AppError(ERROR_MESSAGES.INVALID_ITEM_DATA, HTTP_STATUS_CODES.BAD_REQUEST);
    }

    const item: Item = {
      name,
      description,
      quantity,
      price,
    };

    return await this.itemRepository.createItem(item);
  }
}
