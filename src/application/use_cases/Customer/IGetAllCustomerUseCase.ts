import { Customer } from "../../../domain/models/Customer";
import { PaginatedResult } from "../../../shared/PaginatedResult";

export interface IGetAllCustomers {
  execute(page: number, limit: number, search?: string):Promise<PaginatedResult<Customer>>;
}