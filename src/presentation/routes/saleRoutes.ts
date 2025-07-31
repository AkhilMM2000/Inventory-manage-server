import express from "express";
import { container } from "tsyringe";

import { SaleController } from "../controllers/SaleController";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
import { saleController } from "../../infrastructure/config/controllers";
 

const router = express.Router();
const authMiddleware = container.resolve(AuthMiddleware);
router
.post("/", authMiddleware.protectRoute(), saleController.createSale.bind(saleController))
.get("/", authMiddleware.protectRoute(), SaleController.getAllSales)
.get("/customer/:id",authMiddleware.protectRoute(),SaleController.getCustomerLedger);
export default router;
