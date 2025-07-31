import { inject, injectable } from "tsyringe";
import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { Item } from "../../../domain/models/Item";
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode"; 
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
import { IUpdateItemUseCase } from "./IUpdateItemUseCase";

@injectable()
export class UpdateItemUseCase implements IUpdateItemUseCase {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(id: string, updatedItem: Partial<Item>): Promise<Item> {
    const item = await this.itemRepository.update(id, updatedItem);

    if (!item) {
      throw new AppError(ERROR_MESSAGES.ITEM_UPDATE_ERROR, HTTP_STATUS_CODES.NOT_FOUND);
    }

    return item;
  }
}
