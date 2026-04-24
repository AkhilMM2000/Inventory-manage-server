import { AddItemRequestDTO, ItemResponseDTO } from "../../../domain/dtos/ItemDTO";

export interface IAddItemUseCase {
  execute(data: AddItemRequestDTO): Promise<ItemResponseDTO>;
}
