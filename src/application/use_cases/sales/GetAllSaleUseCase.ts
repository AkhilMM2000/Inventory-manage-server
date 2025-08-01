import { inject, injectable } from "tsyringe";

import { ISaleRepository } from "../../../domain/repositories/ISaleRepository"; 
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
import { IGetAllSales } from "./IGetAllSaleUseCase";
import { PaginatedResult } from "../../../shared/PaginatedResult";
import { Sale } from "../../../domain/models/Sales";

@injectable()
export class GetAllSales implements IGetAllSales {
  constructor(
    @inject("ISaleRepository")
    private saleRepository: ISaleRepository
  ) {}

  async execute(
    page: number,
    limit: number,
    search?: string,
    paymentType?: "Cash" | "Credit"
  ):Promise<PaginatedResult<Sale>>
  
  {
    if (page <= 0 || limit <= 0) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_PAGINATION_PARAMS,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    return await this.saleRepository.getAllSales(page, limit, search, paymentType);
  }
}
