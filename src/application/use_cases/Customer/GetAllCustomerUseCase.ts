import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository"; 
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage"; 
import { PaginatedResult } from "../../../shared/PaginatedResult";
import { Customer } from "../../../domain/models/Customer";
import { IGetAllCustomers } from "./IGetAllCustomerUseCase";

@injectable()
export class GetAllCustomers implements IGetAllCustomers {
  constructor(
    @inject("ICustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute(page: number, limit: number, search?: string):Promise<PaginatedResult<Customer>> {
    if (page <= 0 || limit <= 0) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_PAGINATION_PARAMS,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    return await this.customerRepository.getAllCustomers(page, limit, search);
  }
}
