import { Router } from "express";
import { container } from "tsyringe";

import { ItemController } from "../controllers/ItemController";
import { AuthMiddleware } from "../../middleware/AuthMiddleware"; 

const router = Router();
const authMiddleware = container.resolve(AuthMiddleware);

router
  .post("/", authMiddleware.protectRoute(), ItemController.addItem);

export default router;
