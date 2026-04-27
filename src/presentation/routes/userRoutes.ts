import { Router } from "express";
import { container } from "tsyringe";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
import { userController } from "../../infrastructure/config/controllers";
import { API_ROUTES } from "../../constants/ApiRoutes";

const authMiddleware = container.resolve(AuthMiddleware);
const router = Router();

router
  .post(API_ROUTES.AUTH.REGISTER, userController.register.bind(userController))
  .post(API_ROUTES.AUTH.LOGIN,userController.login.bind(userController))
  .post(API_ROUTES.AUTH.REFRESH_TOKEN,userController.refreshToken.bind(userController))
  .post(API_ROUTES.AUTH.LOGOUT, authMiddleware.protectRoute(),userController.logout.bind(userController))
  .get(API_ROUTES.AUTH.ME, authMiddleware.protectRoute(), userController.getMe.bind(userController));
export default router;
