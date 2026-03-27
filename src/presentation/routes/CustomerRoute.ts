import express from "express";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
import { container } from "tsyringe";
import { customerController } from "../../infrastructure/config/controllers";
const router = express.Router();
const authMiddleware = container.resolve(AuthMiddleware);
// 🔐 Protected route to add customer
router.
post("/",  customerController.addCustomer.bind(customerController))
.get("/", authMiddleware.protectRoute(), customerController.getAllCustomers.bind(customerController))   
.put('/:customerId',authMiddleware.protectRoute(),customerController.updateCustomer.bind(customerController))
.delete("/:customerId",authMiddleware.protectRoute(), customerController.deleteCustomer.bind(customerController))
.get("/customer/:customerId",authMiddleware.protectRoute(),customerController.getCustomerLedger.bind(customerController));
export default router;
