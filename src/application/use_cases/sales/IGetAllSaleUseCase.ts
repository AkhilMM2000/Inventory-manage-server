import { PaginatedResult } from "../../../shared/PaginatedResult";
import { SaleResponseDTO } from "../../../domain/dtos/SaleDTO";

export interface IGetAllSales {
  execute(
    page: number,
    limit: number,
    search?: string,
    paymentType?: "Cash" | "Credit"
  ):Promise<PaginatedResult<SaleResponseDTO>>;
}
