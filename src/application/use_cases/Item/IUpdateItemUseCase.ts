import { Item } from "../../../domain/models/Item";

export interface IUpdateItemUseCase {
  execute(id: string, updatedItem: Partial<Item>): Promise<Item>;
}