import { injectable } from "tsyringe";
import { ISaleRepository } from "../../../domain/repositories/ISaleRepository";
import { Sale} from "../../../domain/models/Sales"; 
import { SaleModel,SaleDocument } from "../models/SalesSchema"; 
import { AppError } from "../../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode"; 
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";

@injectable()
export class MongoSaleRepository implements ISaleRepository {
  private mapToSale(doc: SaleDocument): Sale {
    return {
      id: (doc._id ?? doc.id)?.toString() || "",
      customerId: doc.customerId,
      customerName: doc.customerName,
      paymentType: doc.paymentType,
      items: doc.items,
      totalAmount: doc.totalAmount,
      createdAt: doc.createdAt,
    };
  }

  async createSale(sale: Sale): Promise<Sale> {
    try {
      const created = await SaleModel.create(sale);
      return this.mapToSale(created);
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllSales(
    page: number,
    limit: number,
    search = "",
    paymentType?: "Cash" | "Credit"
  ) {
    try {
      const skip = (page - 1) * limit;

      const matchStage: { $match: Record<string, unknown> } = {
        $match: {},
      };

      if (search) {
        matchStage.$match.customerName = { $regex: search, $options: "i" };
      }

      if (paymentType) {
        matchStage.$match.paymentType = paymentType;
      }

      const pipeline = [
        matchStage,
        { $sort: { createdAt: -1 as -1 | 1} },
        { $skip: skip },
        { $limit: limit },
      ];

      const sales = await SaleModel.aggregate(pipeline);
      const total = await SaleModel.countDocuments(matchStage.$match);

      return {
        data: sales.map((doc: SaleDocument) => this.mapToSale(doc)),
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
}
