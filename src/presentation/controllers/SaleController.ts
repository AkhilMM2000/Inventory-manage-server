import { Request, Response, NextFunction } from "express";
import { container, inject, singleton } from "tsyringe";

import { ICreateSaleUseCase } from "../../application/use_cases/sales/ISaleUseCase";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { IGetAllSales } from "../../application/use_cases/sales/IGetAllSaleUseCase";
@singleton()
export class SaleController {
    constructor(
    @inject("ICreateSaleUseCase")
    private createSaleUseCase: ICreateSaleUseCase,
     @inject("IGetAllSales")
    private getAllSaleUseCase: IGetAllSales
  ) {}
  async createSale(req: Request, res: Response, next: NextFunction) {
    try {
    
      const sale = await this.createSaleUseCase.execute(req.body);
      res.status(HTTP_STATUS_CODES.OK).json({ sale });
    } catch (error) {
      next(error);
    }
  }

   async getAllSales(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const paymentType = req.query.paymentType as "Cash" | "Credit" | undefined;

    
      const result = await this.getAllSaleUseCase.execute(page, limit, search, paymentType);

      res.status(HTTP_STATUS_CODES.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  
}
