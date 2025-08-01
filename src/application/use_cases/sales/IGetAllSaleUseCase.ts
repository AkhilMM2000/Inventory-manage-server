import { Sale } from "../../../domain/models/Sales";
import { PaginatedResult } from "../../../shared/PaginatedResult";

export interface IGetAllSales {
  execute(
    page: number,
    limit: number,
    search?: string,
    paymentType?: "Cash" | "Credit"
  ):Promise<PaginatedResult<Sale>>;
}
