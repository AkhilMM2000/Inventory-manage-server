import { PaginatedResult } from "../../shared/PaginatedResult";
import { Sale } from "../models/Sales"; 

export interface ISaleRepository {
  createSale(sale: Sale): Promise<Sale>;
getSalesByCustomer(customerId: string): Promise<Sale[]>;

  getAllSales(
    page: number,
    limit: number,
    search?: string,
    paymentType?: "Cash" | "Credit"
  ): Promise<PaginatedResult<Sale>>
}
