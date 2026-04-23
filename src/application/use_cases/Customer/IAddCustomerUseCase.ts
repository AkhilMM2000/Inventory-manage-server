import { AddCustomerRequestDTO, CustomerResponseDTO } from "../../../domain/dtos/CustomerDTO";
 
export interface IAddCustomerUseCase {
  execute(data: AddCustomerRequestDTO): Promise<CustomerResponseDTO>;
}

