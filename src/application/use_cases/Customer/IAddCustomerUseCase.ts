import { Customer, Address } from "../../../domain/models/Customer";
 
export interface AddCustomerDTO {
  name: string;
  address: Address;
  mobile: string;
}

export interface IAddCustomerUseCase {
  execute(data: AddCustomerDTO): Promise<Customer>;
}

