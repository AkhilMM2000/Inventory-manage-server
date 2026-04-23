import { CustomerResponseDTO } from "../../../domain/dtos/CustomerDTO";
import { Customer } from "../../../domain/models/Customer";

export interface IUpdateCustomerUseCase {
  execute(id: string, updatedItem: Partial<Customer>): Promise<CustomerResponseDTO>;
}
