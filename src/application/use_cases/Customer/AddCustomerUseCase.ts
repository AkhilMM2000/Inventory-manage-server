import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository";
import { Customer } from "../../../domain/models/Customer";
import { AppError } from "../../../domain/errors/AppError"; 
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode"; 
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage"; 
import { IAddCustomerUseCase } from "./IAddCustomerUseCase";

interface AddCustomerDTO {
  name: string;
  address: string;
  mobile: string;
}

@injectable()
export class AddCustomer implements IAddCustomerUseCase  {
  constructor(
    @inject("ICustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute(data: AddCustomerDTO): Promise<Customer> {
    const { name, address, mobile } = data;

    if (!name || !address || !mobile) {
      throw new AppError(
        ERROR_MESSAGES.REQUIRED_FIELDS_MISSING,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    const newCustomer: Customer = {
      name,
      address,
      mobile,
    };

    return await this.customerRepository.create(newCustomer);
  }
}

