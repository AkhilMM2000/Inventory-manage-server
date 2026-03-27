import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository";
import { Customer, Address } from "../../../domain/models/Customer";
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
import { IAddCustomerUseCase, AddCustomerDTO } from "./IAddCustomerUseCase";


@injectable()
export class AddCustomer implements IAddCustomerUseCase {
  constructor(
    @inject("ICustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute(data: AddCustomerDTO): Promise<Customer> {
    const { name, address, mobile } = data;
    const newCustomer: Customer = {
      name,
      address,
      mobile,
    };

    return await this.customerRepository.create(newCustomer);
  }
}
