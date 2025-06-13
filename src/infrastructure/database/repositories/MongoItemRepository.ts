import { injectable } from "tsyringe";

import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { Item } from "../../../domain/models/Item";
import { ItemModel } from "../models/ItemSchema";
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
import { ItemDocument } from "../models/ItemSchema";
 
@injectable()
export class MongoItemRepository implements IItemRepository {
  async createItem(item: Item): Promise<Item> {
    try {
      const created = await ItemModel.create(item);
      return this.mapToItem(created);
    } catch (error) {
      if (error instanceof Error) {
    throw new AppError(error.message,HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
  throw new AppError(ERROR_MESSAGES.UNEXPECTED_ERROR, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  async getItemById(id: string): Promise<Item | null> {
    try {
      const item = await ItemModel.findById(id);
      return item ? this.mapToItem(item) : null;
    } catch (error) {
     if (error instanceof Error) {
    throw new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
  throw new AppError(ERROR_MESSAGES.UNEXPECTED_ERROR, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllItems(): Promise<Item[]> {
    try {
      const items = await ItemModel.find();
      return items.map(this.mapToItem);
    } catch (error) {
      if (error instanceof Error) {
    throw new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
  throw new AppError(ERROR_MESSAGES.UNEXPECTED_ERROR,HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  async updateItem(id: string, updatedItem: Partial<Item>): Promise<Item | null> {
    try {
      const item = await ItemModel.findByIdAndUpdate(id, updatedItem, { new: true });
      return item ? this.mapToItem(item) : null;
    } catch (error) {
        if (error instanceof Error) {
    throw new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
  throw new AppError(ERROR_MESSAGES.UNEXPECTED_ERROR, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteItem(id: string): Promise<boolean> {
    try {
      const result = await ItemModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
        if (error instanceof Error) {
    throw new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
  throw new AppError(ERROR_MESSAGES.UNEXPECTED_ERROR, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  async searchItems(query: string): Promise<Item[]> {
    try {
      const regex = new RegExp(query, "i");
      const results = await ItemModel.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
        ],
      });
      return results.map(this.mapToItem);
    } catch (error) {
      if (error instanceof Error) {
    throw new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
  throw new AppError(ERROR_MESSAGES.UNEXPECTED_ERROR, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  private mapToItem(doc:ItemDocument): Item {
    return {
      id: doc.id.toString(),
      name: doc.name,
      description: doc.description,
      quantity: doc.quantity,
      price: doc.price,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
