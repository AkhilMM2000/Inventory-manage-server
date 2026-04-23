import { Address } from "../models/Customer";

export interface AddCustomerRequestDTO {
  name: string;
  address: Address;
  mobile: string;
}

export interface UpdateCustomerRequestDTO {
  name?: string;
  address?: Address;
  mobile?: string;
}

export interface CustomerResponseDTO {
  id: string;
  name: string;
  address: Address;
  mobile: string;
  createdAt?: Date;
  updatedAt?: Date;
  salesCount?: number;
}

export interface CustomerLedgerResponseDTO {
  customer: CustomerResponseDTO;
  sales: any[]; 
  summary: {
    totalOrders: number;
    totalSales: number;
    cashPaid: number;
    creditOutstanding: number;
  };
}
