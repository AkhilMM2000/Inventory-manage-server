import { container } from "tsyringe";
import { ItemController } from "../../presentation/controllers/ItemController";

export const itemController = container.resolve(ItemController);