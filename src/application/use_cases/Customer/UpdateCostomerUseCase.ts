import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository"; 
import { EntityNotFoundError } from "../../../domain/errors/DomainExceptions"; 
import { Customer } from "../../../domain/models/Customer";
import { IUpdateCustomerUseCase } from "./IUpdateCustomerUseCase";

@injectable()
export class UpdateCustomerUseCase implements  IUpdateCustomerUseCase   {
  constructor(
    @inject("ICustomerRepository")
  private customerRepository: ICustomerRepository
  ) {}

  async execute(id: string, updatedItem: Partial<Customer>): Promise<Customer> {
    const updated = await this.customerRepository.update(id, updatedItem);

    if (!updated) {
      throw new EntityNotFoundError("Customer");
    }

    return updated;
  }
}
