import { container } from "tsyringe";
import { ItemController } from "../../presentation/controllers/ItemController";
import { SaleController } from "../../presentation/controllers/SaleController";

export const itemController = container.resolve(ItemController);
export const saleController=container.resolve(SaleController)