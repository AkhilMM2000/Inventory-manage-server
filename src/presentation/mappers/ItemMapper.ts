import { Item } from "../../domain/models/Item";
import { ItemResponseDTO } from "../dtos/ItemResponseDTO";
import { PaginatedResult } from "../../shared/PaginatedResult";

export class ItemMapper {
  static toResponse(item: Item): ItemResponseDTO {
    return {
      id: item.id || "",
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  static toResponseList(items: Item[]): ItemResponseDTO[] {
    return items.map(this.toResponse);
  }

  static toPaginatedResponse(result: PaginatedResult<Item>): PaginatedResult<ItemResponseDTO> {
    return {
      data: this.toResponseList(result.data),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }
}
