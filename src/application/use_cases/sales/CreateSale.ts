import { inject, injectable } from "tsyringe";

import { ISaleRepository } from "../../../domain/repositories/ISaleRepository"; 
import { IItemRepository } from "../../../domain/repositories/IItemRepository"; 
import { Sale,SaleItem } from "../../../domain/models/Sales"; 
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";

interface CreateSaleDTO {
  customerId: string;
  customerName: string;
  paymentType: "Cash" | "Credit";
  items: SaleItem[];
}

@injectable()
export class CreateSale {
  constructor(
    @inject("ISaleRepository")
    private saleRepository: ISaleRepository,

    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(data: CreateSaleDTO): Promise<Sale> {
    const { customerId, customerName, paymentType, items } = data;

    if (!customerId || !customerName || !paymentType || !items || items.length === 0) {
      throw new AppError(
        ERROR_MESSAGES.REQUIRED_FIELDS_MISSING,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    let totalAmount = 0;

    for (const item of items) {
      const found = await this.itemRepository.getItemById(item.itemId);

      if (!found) {
        throw new AppError(
          `Item with ID ${item.itemId} not found`,
          HTTP_STATUS_CODES.NOT_FOUND
        );
      }

      if (found.quantity < item.quantity) {
        throw new AppError(
          `Only ${found.quantity} units of "${found.name}" available`,
          HTTP_STATUS_CODES.BAD_REQUEST
        );
      }

      totalAmount += item.quantity * item.unitPrice;

      // Reduce stock
      await this.itemRepository.reduceItemStock(item.itemId, item.quantity);
    }

    const newSale: Sale = {
      customerId,
      customerName,
      paymentType,
      items,
      totalAmount,
    };

    return await this.saleRepository.createSale(newSale);
  }
}
