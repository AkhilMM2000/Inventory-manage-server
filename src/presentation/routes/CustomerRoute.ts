import express from "express";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
import { container } from "tsyringe";
import { customerController } from "../../infrastructure/config/controllers";
import { API_ROUTES } from "../../constants/ApiRoutes";

const router = express.Router();
const authMiddleware = container.resolve(AuthMiddleware);
// 🔐 Protected route to add customer
router.
post(API_ROUTES.CUSTOMERS.ROOT,  customerController.addCustomer.bind(customerController))
.get(API_ROUTES.CUSTOMERS.ROOT, authMiddleware.protectRoute(), customerController.getAllCustomers.bind(customerController))   
.put(API_ROUTES.CUSTOMERS.BY_ID,authMiddleware.protectRoute(),customerController.updateCustomer.bind(customerController))
.delete(API_ROUTES.CUSTOMERS.BY_ID,authMiddleware.protectRoute(), customerController.deleteCustomer.bind(customerController))
.get(API_ROUTES.CUSTOMERS.LEDGER,authMiddleware.protectRoute(),customerController.getCustomerLedger.bind(customerController));
export default router;
