import express from "express";
import { CustomerController } from "../controllers/CustomerController";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
import { container } from "tsyringe";
import { SaleController } from "../controllers/SaleController";

const router = express.Router();
const authMiddleware = container.resolve(AuthMiddleware);
// 🔐 Protected route to add customer
router.
post("/", authMiddleware.protectRoute(), CustomerController.addCustomer)
.get("/", authMiddleware.protectRoute(), CustomerController.getAllCustomers)   
.put('/:id',authMiddleware.protectRoute(),CustomerController.updateCustomer)
.delete("/:id",authMiddleware.protectRoute(), CustomerController.deleteCustomer)
.get("/customer/:customerId",authMiddleware.protectRoute(),CustomerController.getCustomerLedger);
export default router;
