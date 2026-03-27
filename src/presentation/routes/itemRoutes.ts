import { Router } from "express";
import { container } from "tsyringe";
import { itemController } from "../../infrastructure/config/controllers"; 
import { AuthMiddleware } from "../../middleware/AuthMiddleware"; 
const router = Router();
const authMiddleware = container.resolve(AuthMiddleware);

router
  .post("/", authMiddleware.protectRoute(), itemController.addItem.bind(itemController))
  .get("/", authMiddleware.protectRoute(), itemController.getAllItems.bind(itemController))
  .get("/search", authMiddleware.protectRoute(), itemController.searchItems.bind(itemController))
  .get("/:itemId", authMiddleware.protectRoute(),itemController.getItemById.bind(itemController))
  .put("/:itemId", authMiddleware.protectRoute(), itemController.updateItem.bind(itemController))
  .delete("/:itemId",authMiddleware.protectRoute(),itemController.deleteItem.bind(itemController))
export default router;


