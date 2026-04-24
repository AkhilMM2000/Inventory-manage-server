export interface AddItemRequestDTO {
  name: string;
  description?: string;
  quantity: number;
  price: number;
}

export interface UpdateItemRequestDTO {
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
}

export interface ItemResponseDTO {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
