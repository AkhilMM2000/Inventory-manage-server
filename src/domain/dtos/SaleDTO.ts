import { SaleItem } from "../models/Sales";

export interface CreateSaleRequestDTO {
  customerId: string;
  customerName: string;
  paymentType: "Cash" | "Credit";
  items: SaleItem[];
}

export interface SaleResponseDTO {
  id: string;
  customerId: string;
  customerName: string;
  paymentType: "Cash" | "Credit";
  items: SaleItem[];
  totalAmount: number;
  createdAt?: Date;
}
