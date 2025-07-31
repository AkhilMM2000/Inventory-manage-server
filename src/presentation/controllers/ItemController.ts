import { Request, Response, NextFunction } from "express";
import { container, inject, singleton } from "tsyringe";
import { GetAllItems } from "../../application/use_cases/Item/GetAllItems";
import { SearchItems } from "../../application/use_cases/Item/SearchItems"; 
import { GetItemById } from "../../application/use_cases/Item/GetItemById";
import { UpdateItem } from "../../application/use_cases/Item/UpdateItem";

import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../constants/ErrorMessage";
import { IAddItemUseCase } from "../../application/use_cases/Item/IAddItemUseCase";
import { IDeleteItemUseCase } from "../../application/use_cases/Item/IDeleteItemUsecase";
@singleton()
export class ItemController {
  constructor(
    @inject("IAddItemUseCase")
    private addItemUseCase: IAddItemUseCase,
    @inject("IDeleteItemUseCase")
    private deleteItemUseCase:IDeleteItemUseCase
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
  
static async getAllItems(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const getAllItems = container.resolve(GetAllItems);
    const result = await getAllItems.execute(page, limit);

    res.status(HTTP_STATUS_CODES.OK).json(result);
  } catch (err) {
    next(err);
  }
}
static async searchItems(req: Request, res: Response, next: NextFunction) {
  try {
    const query = (req.query.search as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const searchItems = container.resolve(SearchItems);
    const result = await searchItems.execute(query, page, limit);

  res.status(HTTP_STATUS_CODES.OK).json(result);
  } catch (err) {
    next(err);
  }
}
static async getItemById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const getItemById = container.resolve(GetItemById);
    const item = await getItemById.execute(id);

    res.status(HTTP_STATUS_CODES.OK).json({ item });
  } catch (err) {
    next(err);
  }
}
static async updateItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // Filter only defined fields from body
    const filteredUpdate = Object.fromEntries(
      Object.entries(req.body).filter(([, value]) => value !== undefined)
    );

    const updateItem = container.resolve(UpdateItem);
    const item = await updateItem.execute(id, filteredUpdate);

 res.status(HTTP_STATUS_CODES.OK).json({ item });
  } catch (err) {
    next(err);
  }
}

}

