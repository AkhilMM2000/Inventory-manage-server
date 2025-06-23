import { PaginatedResult } from "../../shared/PaginatedResult";
import { Customer } from "../models/Customer";

export interface ICustomerRepository {
  create(data: Partial<Customer>): Promise<Customer>;
  getAllCustomers(page: number, limit: number, search?: string):Promise<PaginatedResult<Customer>>;
  findById(id: string): Promise<Customer | null>;
  update(id: string, updatedData: Partial<Customer>): Promise<Customer | null>;
  delete(id: string): Promise<boolean>;
}
