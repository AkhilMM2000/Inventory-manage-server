import { Item } from "../../../domain/models/Item";

export interface IGetItemByIdUseCase {
  execute(id: string): Promise<Item>;
}