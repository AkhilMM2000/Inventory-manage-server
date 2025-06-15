import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { AddCustomer } from "../../application/use_cases/Customer/AddCustomer";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { GetAllCustomers } from "../../application/use_cases/Customer/GetAllCustomer";
import { UpdateCustomer } from "../../application/use_cases/Customer/UpdateCostomer";
import { DeleteCustomer } from "../../application/use_cases/Customer/DeleteCustomer";

export class CustomerController {
  static async addCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const addCustomer = container.resolve(AddCustomer);
      const customer = await addCustomer.execute(req.body);
     res.status(HTTP_STATUS_CODES.CREATED).json({ customer });
    } catch (error) {
      next(error);
    }
  }
 static async getAllCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

      const getAllCustomers = container.resolve(GetAllCustomers);
      const result = await getAllCustomers.execute(page, limit, search);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
static async updateCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const filteredUpdate = Object.fromEntries(
      Object.entries(req.body).filter(([, value]) => value !== undefined)
    );

    const updateCustomer = container.resolve(UpdateCustomer);

    const updated = await updateCustomer.execute(id,filteredUpdate);
    res.status(200).json({ customer: updated });
  } catch (error) {
    next(error);
  }
}
static async deleteCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deleteCustomer = container.resolve(DeleteCustomer);
    await deleteCustomer.execute(id);
res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    next(error);
  }
}
}
