import { Customer } from "../../domain/models/Customer";
import { CustomerResponseDTO } from "../../domain/dtos/CustomerDTO";
import { PaginatedResult } from "../../shared/PaginatedResult";

export class CustomerMapper {
  static toResponse(customer: Customer): CustomerResponseDTO {
    return {
      id: customer.id || "",
      name: customer.name,
      address: customer.address,
      mobile: customer.mobile,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      salesCount: customer.salesCount || 0,
    };
  }

  static toResponseList(customers: Customer[]): CustomerResponseDTO[] {
    return customers.map(this.toResponse);
  }

  static toPaginatedResponse(result: PaginatedResult<Customer>): PaginatedResult<CustomerResponseDTO> {
    return {
      data: this.toResponseList(result.data),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }
}
