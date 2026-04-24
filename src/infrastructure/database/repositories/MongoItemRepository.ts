import { injectable } from "tsyringe";

import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { Item } from "../../../domain/models/Item";
import { ItemModel } from "../models/ItemSchema";
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
import { ItemDocument } from "../models/ItemSchema";
import { PaginatedResult } from "../../../shared/PaginatedResult";
import { BaseRepository } from "./BaseRepository";
 
@injectable()
export class MongoItemRepository extends BaseRepository<Item> implements IItemRepository {
protected _model = ItemModel


  async getAllItems(page: number, limit: number): Promise<PaginatedResult<Item>> {
  try {
    const skip = (page - 1) * limit;

    const results = await this._model.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit }
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      }
    ]);

    const items = results[0]?.data || [];
    const total = results[0]?.totalCount[0]?.count || 0;

    return {
      data: items.map(this.map),
      total,
      page,
      limit,
    };
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      throw new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    throw new AppError(ERROR_MESSAGES.UNEXPECTED_ERROR, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
}
 
async searchItems(query: string, page: number, limit: number): Promise<PaginatedResult<Item>> {
  try {
    const regex = new RegExp(query, "i");
    const skip = (page - 1) * limit;

    const results = await this._model.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit }
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      }
    ]);

    const items = results[0]?.data || [];
    const total = results[0]?.totalCount[0]?.count || 0;

    return {
      data: items.map(this.map),
      total,
      page,
      limit,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    throw new AppError(ERROR_MESSAGES.UNEXPECTED_ERROR, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
}
  


  
async reduceItemStock(itemId: string, quantity: number): Promise<void> {
  try {
    const item = await ItemModel.findById(itemId);

    if (!item) {
      throw new AppError("Item not found", HTTP_STATUS_CODES.NOT_FOUND);
    }

    if (item.quantity < quantity) {
      throw new AppError(
        `Only ${item.quantity} units of ${item.name} available`,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    item.quantity -= quantity;
    await item.save();
  } catch (error) {
    throw new AppError(
      error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
}
 

  protected map(doc:ItemDocument): Item {
    return {
      id: (doc._id ?? doc.id)?.toString() || "",
      name: doc.name,
      description: doc.description,
      quantity: doc.quantity,
      price: doc.price,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
