import { Customer } from "../../../domain/models/Customer";

export interface AddCustomerDTO {
  name: string;
  address: string;
  mobile: string;
}

export interface IAddCustomerUseCase {
  execute(data: AddCustomerDTO): Promise<Customer>;
}
