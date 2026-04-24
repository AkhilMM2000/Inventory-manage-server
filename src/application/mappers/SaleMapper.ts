import { Sale } from "../../domain/models/Sales";
import { SaleResponseDTO } from "../../domain/dtos/SaleDTO";
import { PaginatedResult } from "../../shared/PaginatedResult";

export class SaleMapper {
  static toResponse(sale: Sale): SaleResponseDTO {
    return {
      id: sale.id || "",
      customerId: sale.customerId,
      customerName: sale.customerName,
      paymentType: sale.paymentType,
      items: sale.items,
      totalAmount: sale.totalAmount,
      createdAt: sale.createdAt,
    };
  }

  static toResponseList(sales: Sale[]): SaleResponseDTO[] {
    return sales.map(this.toResponse);
  }

  static toPaginatedResponse(result: PaginatedResult<Sale>): PaginatedResult<SaleResponseDTO> {
    return {
      data: this.toResponseList(result.data),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }
}
