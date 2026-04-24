import { ItemResponseDTO } from "../../../domain/dtos/ItemDTO";

export interface IGetItemByIdUseCase {
  execute(id: string): Promise<ItemResponseDTO>;
}