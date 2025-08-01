import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository";
import { AppError } from "../../../domain/errors/AppError"; 
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode"; 
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage"; 
import { IDeleteCustomerUseCase } from "./IDeleteCustomerUseCase";

@injectable()
export class DeleteCustomerUseCase implements IDeleteCustomerUseCase {
  constructor(
    @inject("ICustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute(customerId: string): Promise<void> {
    const deleted = await this.customerRepository.delete(customerId);
    if (!deleted) {
      throw new AppError(
        ERROR_MESSAGES.CUSTOMER_NOT_FOUND,
        HTTP_STATUS_CODES.NOT_FOUND
      );
    }
  }
}
