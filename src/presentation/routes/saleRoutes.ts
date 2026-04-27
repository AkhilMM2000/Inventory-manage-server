import express from "express";
import { container } from "tsyringe";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
import { saleController } from "../../infrastructure/config/controllers";
import { API_ROUTES } from "../../constants/ApiRoutes";

const router = express.Router();
const authMiddleware = container.resolve(AuthMiddleware);
router
.post(API_ROUTES.SALES.ROOT, authMiddleware.protectRoute(), saleController.createSale.bind(saleController))
.get(API_ROUTES.SALES.ROOT, authMiddleware.protectRoute(), saleController.getAllSales.bind(saleController))

export default router;
