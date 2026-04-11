import { injectable } from "tsyringe";

import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository";
import { Customer } from "../../../domain/models/Customer";
import { CustomerModel, CustomerDocument } from "../models/CustomerSchema";
import { AppError } from "../../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode"; 
import { BaseRepository } from "./BaseRepository";

@injectable()
export class MongoCustomerRepository   extends BaseRepository<Customer> implements ICustomerRepository 
{
  protected model = CustomerModel;

  protected map(doc: CustomerDocument): Customer {
    return {
    id: (doc._id ?? doc.id)?.toString() || "",
      name: doc.name,
      address: doc.address,
      mobile: doc.mobile,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  
  async getAllCustomers(page: number, limit: number, search = "") {
    try {
      const regex = new RegExp(search, "i");
      const skip = (page - 1) * limit;

      const results = await this.model.aggregate([
        {
          $match: {
            $or: [
              { name: { $regex: regex } },
              { "address.line1": { $regex: regex } },
              { "address.line2": { $regex: regex } },
              { "address.city": { $regex: regex } },
              { "address.district": { $regex: regex } },
              { "address.state": { $regex: regex } },
              { "address.postalCode": { $regex: regex } },
              { "address.country": { $regex: regex } }
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
      throw new AppError(
        error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }


}
