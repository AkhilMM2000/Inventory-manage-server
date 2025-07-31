import { Request, Response, NextFunction } from "express";
import { container, inject } from "tsyringe";
import { CreateSale } from "../../application/use_cases/sales/CreateSale";
import { GetAllSales } from "../../application/use_cases/sales/GetAllSales";
import { GetCustomerLedger } from "../../application/use_cases/Customer/GetCustomerLedger";
import { ICreateSaleUseCase } from "../../application/use_cases/sales/ISaleUseCase";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";

export class SaleController {
    constructor(
    @inject("ICreateSaleUseCase")
    private createSaleUseCase: ICreateSaleUseCase
  ) {}
  async createSale(req: Request, res: Response, next: NextFunction) {
    try {
    
      const sale = await this.createSaleUseCase.execute(req.body);
      res.status(HTTP_STATUS_CODES.OK).json({ sale });
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
   static async getCustomerLedger(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const getCustomerLedger = container.resolve(GetCustomerLedger);
      const ledger = await getCustomerLedger.execute(id);

       res.status(200).json(ledger);
    } catch (error) {
      next(error);
    }
  }
}
