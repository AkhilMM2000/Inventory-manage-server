import { Customer } from "../../../domain/models/Customer";

export interface IUpdateCustomerUseCase {
  execute(id: string, updatedItem: Partial<Customer>): Promise<Customer>;
}
