import { inject, injectable } from "tsyringe";

import { ISaleRepository } from "../../../domain/repositories/ISaleRepository"; 
import { IItemRepository } from "../../../domain/repositories/IItemRepository"; 
import { Sale,SaleItem } from "../../../domain/models/Sales"; 
import { EntityNotFoundError, InsufficientStockError } from "../../../domain/errors/DomainExceptions";
import { ICreateSaleUseCase } from "./ISaleUseCase";
import { CreateSaleRequestDTO, SaleResponseDTO } from "../../../domain/dtos/SaleDTO";
import { SaleMapper } from "../../mappers/SaleMapper";


@injectable()
export class  CreateSale implements ICreateSaleUseCase{
  constructor(
    @inject("ISaleRepository")
    private _saleRepository: ISaleRepository,

    @inject("IItemRepository")
    private _itemRepository: IItemRepository
  ) {}

  async execute(data: CreateSaleRequestDTO): Promise<SaleResponseDTO> {
    const { customerId, customerName, paymentType, items } = data;


    let totalAmount = 0;

    for (const item of items) {
      const found = await this._itemRepository.findById(item.itemId);

      if (!found) {
        throw new EntityNotFoundError(`Item with ID ${item.itemId}`);
      }

      if (found.quantity < item.quantity) {
        throw new InsufficientStockError(found.name, found.quantity);
      }

      totalAmount += item.quantity * item.unitPrice;

      // Reduce stock
      await this._itemRepository.reduceItemStock(item.itemId, item.quantity);
    }

    const newSale: Sale = {
      customerId,
      customerName,
      paymentType,
      items,
      totalAmount,
    };

    const sale = await this._saleRepository.create(newSale);
    return SaleMapper.toResponse(sale);
  }
}
