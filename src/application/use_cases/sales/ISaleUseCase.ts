import { Sale,SaleItem } from "../../../domain/models/Sales";

export interface CreateSaleDTO {
  customerId: string;
  customerName: string;
  paymentType: "Cash" | "Credit";
  items: SaleItem[];
}

export interface ICreateSaleUseCase {
  execute(data: CreateSaleDTO): Promise<Sale>;
}
