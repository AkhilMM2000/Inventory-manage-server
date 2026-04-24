import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository";
import { Customer} from "../../../domain/models/Customer";

import { IAddCustomerUseCase } from "./IAddCustomerUseCase";
import { AddCustomerRequestDTO, CustomerResponseDTO } from "../../../domain/dtos/CustomerDTO";
import { CustomerMapper } from "../../mappers/CustomerMapper";


@injectable()
export class AddCustomer implements IAddCustomerUseCase {
  constructor(
    @inject("ICustomerRepository")
    private _customerRepository: ICustomerRepository
  ) {}

  async execute(data: AddCustomerRequestDTO): Promise<CustomerResponseDTO> {
    const { name, address, mobile } = data;
    const newCustomer: Customer = {
      name,
      address,
      mobile,
    };

    const customer = await this._customerRepository.create(newCustomer);
    return CustomerMapper.toResponse(customer);
  }
}
