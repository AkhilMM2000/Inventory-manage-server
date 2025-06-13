import { Router } from "express";
import { container } from "tsyringe";

import { ItemController } from "../controllers/ItemController";
import { AuthMiddleware } from "../../middleware/AuthMiddleware"; 

const router = Router();
const authMiddleware = container.resolve(AuthMiddleware);

router
  .post("/", authMiddleware.protectRoute(), ItemController.addItem)
  .get("/", authMiddleware.protectRoute(), ItemController.getAllItems)
  .get("/search", authMiddleware.protectRoute(), ItemController.searchItems)
  .get("/:id", authMiddleware.protectRoute(), ItemController.getItemById)
  .put("/:id", authMiddleware.protectRoute(), ItemController.updateItem)
  .delete("/:id",authMiddleware.protectRoute(),ItemController.deleteItem)
export default router;
