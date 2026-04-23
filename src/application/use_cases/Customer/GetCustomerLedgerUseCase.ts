import { inject, injectable } from "tsyringe";

import { ISaleRepository } from "../../../domain/repositories/ISaleRepository"; 
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository"; 
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode"; 
import { ICustomerLedgerUseCase } from "./IGetCustomerLedgerUseCase";
import { CustomerLedgerResponseDTO } from "../../../domain/dtos/CustomerDTO";
import { CustomerMapper } from "../../mappers/CustomerMapper";

@injectable()
export class GetCustomerLedgerUseCase implements  ICustomerLedgerUseCase {
  constructor(
    @inject("ISaleRepository") private saleRepo: ISaleRepository,
    @inject("ICustomerRepository") private customerRepo: ICustomerRepository
  ) {}

  async execute(customerId: string):Promise<CustomerLedgerResponseDTO> {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new AppError("Customer not found", HTTP_STATUS_CODES.NOT_FOUND);
    }

    const sales = await this.saleRepo.getSalesByCustomer(customerId);

    const summary = {
      totalOrders: sales.length,
      totalSales: sales.reduce((sum, sale) => sum + sale.totalAmount, 0),
      cashPaid: sales
        .filter((s) => s.paymentType === "Cash")
        .reduce((sum, s) => sum + s.totalAmount, 0),
      creditOutstanding: sales
        .filter((s) => s.paymentType === "Credit")
        .reduce((sum, s) => sum + s.totalAmount, 0),
    };

    return {
      customer: CustomerMapper.toResponse(customer),
      sales,
      summary,
    };
  }
}
