import { Router } from "express";
import { container } from "tsyringe";
import { itemController } from "../../infrastructure/config/controllers"; 
import { AuthMiddleware } from "../../middleware/AuthMiddleware"; 
import { API_ROUTES } from "../../constants/ApiRoutes";

const router = Router();
const authMiddleware = container.resolve(AuthMiddleware);

router
  .post(API_ROUTES.ITEMS.ROOT, authMiddleware.protectRoute(), itemController.addItem.bind(itemController))
  .get(API_ROUTES.ITEMS.ROOT, authMiddleware.protectRoute(), itemController.getAllItems.bind(itemController))
  .get(API_ROUTES.ITEMS.SEARCH, authMiddleware.protectRoute(), itemController.searchItems.bind(itemController))
  .get(API_ROUTES.ITEMS.BY_ID, authMiddleware.protectRoute(),itemController.getItemById.bind(itemController))
  .put(API_ROUTES.ITEMS.BY_ID, authMiddleware.protectRoute(), itemController.updateItem.bind(itemController))
  .delete(API_ROUTES.ITEMS.BY_ID,authMiddleware.protectRoute(),itemController.deleteItem.bind(itemController))
export default router;


