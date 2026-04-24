import { inject, injectable } from "tsyringe";

import { ISaleRepository } from "../../../domain/repositories/ISaleRepository"; 
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
import { IGetAllSales } from "./IGetAllSaleUseCase";
import { PaginatedResult } from "../../../shared/PaginatedResult";
import { SaleResponseDTO } from "../../../domain/dtos/SaleDTO";
import { SaleMapper } from "../../mappers/SaleMapper";

@injectable()
export class GetAllSales implements IGetAllSales {
  constructor(
    @inject("ISaleRepository")
    private _saleRepository: ISaleRepository
  ) {}

  async execute(
    page: number,
    limit: number,
    search?: string,
    paymentType?: "Cash" | "Credit"
  ):Promise<PaginatedResult<SaleResponseDTO>>
  
  {
    if (page <= 0 || limit <= 0) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_PAGINATION_PARAMS,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    const result = await this._saleRepository.getAllSales(page, limit, search, paymentType);
    return SaleMapper.toPaginatedResponse(result);
  }
}
