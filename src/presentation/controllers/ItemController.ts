import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

import { AddItem } from "../../application/use_cases/AddItem";

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
}
