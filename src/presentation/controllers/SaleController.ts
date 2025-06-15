import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { CreateSale } from "../../application/use_cases/sales/CreateSale";
import { GetAllSales } from "../../application/use_cases/sales/GetAllSales";


export class SaleController {
  static async createSale(req: Request, res: Response, next: NextFunction) {
    try {
      const createSale = container.resolve(CreateSale);
      const sale = await createSale.execute(req.body);
      res.status(201).json({ sale });
    } catch (error) {
      next(error);
    }
  }

    static async getAllSales(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const paymentType = req.query.paymentType as "Cash" | "Credit" | undefined;

      const getAllSales = container.resolve(GetAllSales);
      const result = await getAllSales.execute(page, limit, search, paymentType);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
