import { inject, injectable } from "tsyringe";
import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { Item } from "../../../domain/models/Item";
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
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
      throw new AppError(ERROR_MESSAGES.ITEM_NOT_FOUND, HTTP_STATUS_CODES.NOT_FOUND);
    }
    return item;
  }
}
