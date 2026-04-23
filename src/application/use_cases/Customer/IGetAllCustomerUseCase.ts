import { PaginatedResult } from "../../../shared/PaginatedResult";
import { CustomerResponseDTO } from "../../../domain/dtos/CustomerDTO";

export interface IGetAllCustomers {
  execute(page: number, limit: number, search?: string):Promise<PaginatedResult<CustomerResponseDTO>>;
}