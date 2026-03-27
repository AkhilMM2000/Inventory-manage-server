import { inject, injectable } from "tsyringe";

import { ISaleRepository } from "../../../domain/repositories/ISaleRepository"; 
import { IItemRepository } from "../../../domain/repositories/IItemRepository"; 
import { Sale,SaleItem } from "../../../domain/models/Sales"; 
import { EntityNotFoundError, InsufficientStockError } from "../../../domain/errors/DomainExceptions";
import { ICreateSaleUseCase } from "./ISaleUseCase";

interface CreateSaleDTO {
  customerId: string;
  customerName: string;
  paymentType: "Cash" | "Credit";
  items: SaleItem[];
}

@injectable()
export class  CreateSale implements ICreateSaleUseCase{
  constructor(
    @inject("ISaleRepository")
    private saleRepository: ISaleRepository,

    @inject("IItemRepository")
    private itemRepository: IItemRepository
  ) {}

  async execute(data: CreateSaleDTO): Promise<Sale> {
    const { customerId, customerName, paymentType, items } = data;


    let totalAmount = 0;

    for (const item of items) {
      const found = await this.itemRepository.findById(item.itemId);

      if (!found) {
        throw new EntityNotFoundError(`Item with ID ${item.itemId}`);
      }

      if (found.quantity < item.quantity) {
        throw new InsufficientStockError(found.name, found.quantity);
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

    return await this.saleRepository.create(newSale);
  }
}
