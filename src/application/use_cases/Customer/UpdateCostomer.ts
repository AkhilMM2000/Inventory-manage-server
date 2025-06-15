import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository"; 
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage"; 
import { Customer } from "../../../domain/models/Customer";

@injectable()
export class UpdateCustomer {
  constructor(
    @inject("ICustomerRepository")
  private customerRepository: ICustomerRepository
  ) {}

  async execute(id: string, updatedItem: Partial<Customer>): Promise<Customer> {
    const updated = await this.customerRepository.updateCustomer(id, updatedItem);

    if (!updated) {
      throw new AppError(ERROR_MESSAGES.CUSTOMER_NOT_FOUND, HTTP_STATUS_CODES.NOT_FOUND);
    }

    return updated;
  }
}
