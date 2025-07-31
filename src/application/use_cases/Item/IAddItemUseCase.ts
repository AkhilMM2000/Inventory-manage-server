import { Item } from "../../../domain/models/Item";

export interface AddItemDTO {
  name: string;
  description?: string;
  quantity: number;
  price: number;
}

export interface IAddItemUseCase {
  execute(data: AddItemDTO): Promise<Item>;
}
