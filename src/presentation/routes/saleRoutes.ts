import express from "express";
import { container } from "tsyringe";

import { SaleController } from "../controllers/SaleController";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
 

const router = express.Router();
const authMiddleware = container.resolve(AuthMiddleware);
router
.post("/", authMiddleware.protectRoute(), SaleController.createSale)
.get("/", authMiddleware.protectRoute(), SaleController.getAllSales)
.get("/customer/:id",authMiddleware.protectRoute(),SaleController.getCustomerLedger);
export default router;
