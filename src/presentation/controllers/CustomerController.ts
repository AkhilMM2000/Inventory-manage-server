import { Request, Response, NextFunction } from "express";
import { inject, singleton } from "tsyringe";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { IAddCustomerUseCase } from "../../application/use_cases/Customer/IAddCustomerUseCase";
import { IGetAllCustomers } from "../../application/use_cases/Customer/IGetAllCustomerUseCase";
import { IUpdateCustomerUseCase } from "../../application/use_cases/Customer/IUpdateCustomerUseCase";
import { IDeleteCustomerUseCase } from "../../application/use_cases/Customer/IDeleteCustomerUseCase";
import { ICustomerLedgerUseCase } from "../../application/use_cases/Customer/IGetCustomerLedgerUseCase";
import { createCustomerSchema, updateCustomerSchema } from "../validators/CustomerValidator";
import { CustomerMapper } from "../mappers/CustomerMapper";
import { Customer } from "../../domain/models/Customer";

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
  async addCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validData = createCustomerSchema.parse({ body: req.body });
      const customer = await this.addCustomerUseCase.execute(validData.body);
      res.status(HTTP_STATUS_CODES.CREATED).json({ customer: CustomerMapper.toResponse(customer) });
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

      res.status(HTTP_STATUS_CODES.OK).json(CustomerMapper.toPaginatedResponse(result));
    } catch (error) {
      next(error);
    }
  }
 async updateCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log(req.body,'reach edit ')
    const validData = updateCustomerSchema.parse({
      params: req.params,
      body: req.body
    });

    const updated = await this.updateAllCustomerUseCase.execute(
      validData.params.customerId, 
      validData.body as unknown as Partial<Customer>
    );
    res.status(HTTP_STATUS_CODES.OK).json({ customer: CustomerMapper.toResponse(updated) });
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
      
      const ledger = await this.getCustomerLedgerUseCase.execute(customerId);
      res.status(HTTP_STATUS_CODES.OK).json(ledger);
    } catch (error) {
      next(error);
    }
  }
}
