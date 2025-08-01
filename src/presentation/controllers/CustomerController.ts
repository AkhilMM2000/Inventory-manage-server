import { Request, Response, NextFunction } from "express";
import { inject, singleton } from "tsyringe";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { IAddCustomerUseCase } from "../../application/use_cases/Customer/IAddCustomerUseCase";
import { IGetAllCustomers } from "../../application/use_cases/Customer/IGetAllCustomerUseCase";
import { IUpdateCustomerUseCase } from "../../application/use_cases/Customer/IUpdateCustomerUseCase";
import { IDeleteCustomerUseCase } from "../../application/use_cases/Customer/IDeleteCustomerUseCase";
import { ICustomerLedgerUseCase } from "../../application/use_cases/Customer/IGetCustomerLedgerUseCase";
@singleton()
export class CustomerController{
   constructor(
    @inject("IAddCustomerUseCase")
    private addCustomerUseCase: IAddCustomerUseCase,
    @inject("IGetAllCustomerUseCase")
    private getAllCustomersUseCase: IGetAllCustomers,
    @inject("IUpdateCustomerUseCase")
    private updateAllCustomerUseCase:IUpdateCustomerUseCase,
    @inject("IDeleteCustomerUseCase")
    private deleteCustomerUseCase:IDeleteCustomerUseCase,
    @inject("ICustomerLedgerUseCase")
    private getCustomerLedgerUseCase:ICustomerLedgerUseCase
  ) {}
  async addCustomer(req: Request, res: Response, next: NextFunction) {
    try {
    
      const customer = await this.addCustomerUseCase.execute(req.body);
     res.status(HTTP_STATUS_CODES.CREATED).json({ customer });
    } catch (error) {
      next(error);
    }
  }

 async getAllCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

     
      const result = await this.getAllCustomersUseCase.execute(page, limit, search);

      res.status(HTTP_STATUS_CODES.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
 async updateCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const { customerId } = req.params;
    const filteredUpdate = Object.fromEntries(
      Object.entries(req.body).filter(([, value]) => value !== undefined)
    );


    const updated = await this.updateAllCustomerUseCase.execute(customerId,filteredUpdate);
    res.status(HTTP_STATUS_CODES.OK).json({ customer: updated });
  } catch (error) {
    next(error);
  }
}
 async deleteCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const { customerId } = req.params;
   
    await this.deleteCustomerUseCase.execute(customerId);
res.status(HTTP_STATUS_CODES.OK).json({ message: "Customer deleted successfully" });
  } catch (error) {
    next(error);
  }
}

  async getCustomerLedger(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      console.log(customerId,'reach here customer ledger controller')
      const ledger = await this.getCustomerLedgerUseCase.execute(customerId);
      res.status(HTTP_STATUS_CODES.OK).json(ledger);
    } catch (error) {
      next(error);
    }
  }
}
