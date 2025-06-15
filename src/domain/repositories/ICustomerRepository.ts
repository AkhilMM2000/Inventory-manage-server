import { PaginatedResult } from "../../shared/PaginatedResult";
import { Customer } from "../models/Customer";

export interface ICustomerRepository {
  createCustomer(customer: Customer): Promise<Customer>;
  getAllCustomers(page: number, limit: number, search?: string):Promise<PaginatedResult<Customer>>;
  getCustomerById(id: string): Promise<Customer | null>;
  updateCustomer(id: string, updatedData: Partial<Customer>): Promise<Customer | null>;
  deleteCustomer(id: string): Promise<boolean>;
}
