import { injectable } from "tsyringe";

import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository";
import { Customer } from "../../../domain/models/Customer";
import { CustomerModel, CustomerDocument } from "../models/CustomerSchema";
import { AppError } from "../../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode"; 

@injectable()
export class MongoCustomerRepository implements ICustomerRepository {
  private mapToCustomer(doc: CustomerDocument): Customer {
    return {
      id: (doc._id ?? doc.id)?.toString() || "",
      name: doc.name,
      address: doc.address,
      mobile: doc.mobile,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    try {
      const created = await CustomerModel.create(customer);
      return this.mapToCustomer(created);
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllCustomers(page: number, limit: number, search = "") {
    try {
     const regex = new RegExp(search, "i");
         const skip = (page - 1) * limit;
     
         const results = await CustomerModel.aggregate([
           {
             $match: {
               $or: [
                 { name: { $regex: regex } },
                 { address: { $regex: regex } },
               ],
             },
           },
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
           data: items.map(this.mapToCustomer),
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

  async getCustomerById(id: string): Promise<Customer | null> {
    try {
      const customer = await CustomerModel.findById(id);
      return customer ? this.mapToCustomer(customer) : null;
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateCustomer(id: string, updatedData: Partial<Customer>): Promise<Customer | null> {
    try {
      const updated = await CustomerModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      return updated ? this.mapToCustomer(updated) : null;
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteCustomer(id: string): Promise<boolean> {
    try {
      const result = await CustomerModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
}
