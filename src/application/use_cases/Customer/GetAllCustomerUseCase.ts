import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository"; 
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage"; 
import { PaginatedResult } from "../../../shared/PaginatedResult";
import { IGetAllCustomers } from "./IGetAllCustomerUseCase";
import { CustomerResponseDTO } from "../../../domain/dtos/CustomerDTO";
import { CustomerMapper } from "../../mappers/CustomerMapper";

@injectable()
export class GetAllCustomers implements IGetAllCustomers {
  constructor(
    @inject("ICustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute(page: number, limit: number, search?: string):Promise<PaginatedResult<CustomerResponseDTO>> {
    if (page <= 0 || limit <= 0) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_PAGINATION_PARAMS,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    const result = await this.customerRepository.getAllCustomers(page, limit, search);
    return CustomerMapper.toPaginatedResponse(result);
  }
}
