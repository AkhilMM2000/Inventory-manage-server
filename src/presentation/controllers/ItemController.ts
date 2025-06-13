import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

import { AddItem } from "../../application/use_cases/AddItem";
import { GetAllItems } from "../../application/use_cases/GetAllItems";
import { SearchItems } from "../../application/use_cases/SearchItems";

export class ItemController {
  static async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, quantity, price } = req.body;

      const addItem = container.resolve(AddItem);
      const createdItem = await addItem.execute({
        name,
        description,
        quantity,
        price,
      });

      res.status(201).json({ item: createdItem });
    } catch (error) {
      next(error);
    }
  }
  
static async getAllItems(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const getAllItems = container.resolve(GetAllItems);
    const result = await getAllItems.execute(page, limit);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
static async searchItems(req: Request, res: Response, next: NextFunction) {
  try {
    const query = (req.query.q as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const searchItems = container.resolve(SearchItems);
    const result = await searchItems.execute(query, page, limit);

  res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
}
