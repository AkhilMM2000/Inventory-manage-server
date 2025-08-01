import { Request, Response, NextFunction } from "express";
import {inject, singleton } from "tsyringe";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../constants/ErrorMessage";
import { IAddItemUseCase } from "../../application/use_cases/Item/IAddItemUseCase";
import { IDeleteItemUseCase } from "../../application/use_cases/Item/IDeleteItemUseCase";
import { IGetAllItemsUseCase } from "../../application/use_cases/Item/IGetAllItemsUseCase";
import { IGetItemByIdUseCase } from "../../application/use_cases/Item/IGetItemById";
import { ISearchItemsUseCase } from "../../application/use_cases/Item/ISearchItemsUseCase";
import { IUpdateItemUseCase } from "../../application/use_cases/Item/IUpdateItemUseCase";

@singleton()
export class ItemController {
  constructor(
    @inject("IAddItemUseCase")
    private addItemUseCase: IAddItemUseCase,
    @inject("IDeleteItemUseCase")
    private deleteItemUseCase:IDeleteItemUseCase,
    @inject("IGetAllItemsUseCase")
    private getAllItemUseCase:IGetAllItemsUseCase,
    @inject("IGetItemByIdUseCase")
    private getItemByIdUseCase:IGetItemByIdUseCase,
    @inject("ISearchItemsUseCase")
    private searchItemsUseCase: ISearchItemsUseCase,
    @inject("IUpdateItemUseCase")
    private updateItemUseCase: IUpdateItemUseCase,
  ) {}

   async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, quantity, price } = req.body;

      const createdItem = await this.addItemUseCase.execute({
        name,
        description,
        quantity,
        price,
      });

      res.status(HTTP_STATUS_CODES.CREATED).json({ item: createdItem });
    } catch (error) {
      next(error);
    }
  }
  
 async deleteItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { itemId } = req.params;
     this.deleteItemUseCase.execute(itemId )

 res.status(HTTP_STATUS_CODES.OK).json({ message:ERROR_MESSAGES.ITEM_DELETED});
  } catch (err) {
    next(err);
  }
}
  
 async getAllItems(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

  
    const getAllItems= await this.getAllItemUseCase.execute(page, limit);
   
    res.status(HTTP_STATUS_CODES.OK).json(getAllItems);
  } catch (err) {
    next(err);
  }
}
async searchItems(req: Request, res: Response, next: NextFunction) {
  try {
    const query = (req.query.search as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    
    const result = await this.searchItemsUseCase.execute(query, page, limit);

  res.status(HTTP_STATUS_CODES.OK).json(result);
  } catch (err) {
    next(err);
  }
}
 async getItemById(req: Request, res: Response, next: NextFunction) {
  try {
    const { itemId } = req.params;
    const item = await this.getItemByIdUseCase.execute(itemId)
    res.status(HTTP_STATUS_CODES.OK).json({ item });
  } catch (err) {
    next(err);
  }
}
 async updateItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // Filter only defined fields from body
    const filteredUpdate = Object.fromEntries(
      Object.entries(req.body).filter(([, value]) => value !== undefined)
    );

    const item = await this.updateItemUseCase.execute(id, filteredUpdate);

 res.status(HTTP_STATUS_CODES.OK).json({ item });
  } catch (err) {
    next(err);
  }
}

}

