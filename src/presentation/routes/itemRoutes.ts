import { Router } from "express";
import { container } from "tsyringe";
import { itemController } from "../../infrastructure/config/controllers"; 
import { ItemController } from "../controllers/ItemController";
import { AuthMiddleware } from "../../middleware/AuthMiddleware"; 

const router = Router();
const authMiddleware = container.resolve(AuthMiddleware);

router
  .post("/", authMiddleware.protectRoute(), itemController.addItem.bind(itemController))
  .get("/", authMiddleware.protectRoute(), ItemController.getAllItems)
  .get("/search", authMiddleware.protectRoute(), ItemController.searchItems)
  .get("/:itemId", authMiddleware.protectRoute(), ItemController.getItemById)
  .put("/:itemId", authMiddleware.protectRoute(), ItemController.updateItem)
  .delete("/:itemId",authMiddleware.protectRoute(),itemController.deleteItem.bind(itemController))
export default router;


