import { Address } from "../../domain/models/Customer";

export interface CustomerResponseDTO {
  id: string;
  name: string;
  address: Address;
  mobile: string;
  createdAt?: Date;
  updatedAt?: Date;
}
