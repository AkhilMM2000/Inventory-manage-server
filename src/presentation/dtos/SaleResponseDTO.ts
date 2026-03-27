import { SaleItem } from "../../domain/models/Sales";

export interface SaleResponseDTO {
  id: string;
  customerId: string;
  customerName: string;
  paymentType: "Cash" | "Credit";
  items: SaleItem[];
  totalAmount: number;
  createdAt?: Date;
}
