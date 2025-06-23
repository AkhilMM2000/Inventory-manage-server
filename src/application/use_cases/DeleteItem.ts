import { inject, injectable } from "tsyringe";

import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { AppError } from "../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../constants/ErrorMessage";

@injectable()
export class DeleteItem {
  constructor(
    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.itemRepository.delete(id);

    if (!deleted) {
      throw new AppError(ERROR_MESSAGES.NOT_FOUND_OR_DELETE_ERROR, HTTP_STATUS_CODES.NOT_FOUND);
    }
  }
}
