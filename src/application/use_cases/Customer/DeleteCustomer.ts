import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository";

import { AppError } from "../../../domain/errors/AppError"; 
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode"; 
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage"; 

@injectable()
export class DeleteCustomer {
  constructor(
    @inject("ICustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.customerRepository.deleteCustomer(id);
    if (!deleted) {
      throw new AppError(
        ERROR_MESSAGES.CUSTOMER_NOT_FOUND,
        HTTP_STATUS_CODES.NOT_FOUND
      );
    }
  }
}
