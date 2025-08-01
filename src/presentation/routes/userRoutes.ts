import { Router } from "express";
import { container } from "tsyringe";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
import { userController } from "../../infrastructure/config/controllers";
const authMiddleware = container.resolve(AuthMiddleware);
const router = Router();

router
  .post("/register", userController.register.bind(userController))
  .post("/login",userController.login.bind(userController))
  .post("/refresh-token",userController.refreshToken.bind(userController))
  .post("/logout", authMiddleware.protectRoute(),userController.logout.bind(userController))
  .get("/me", authMiddleware.protectRoute(), userController.getMe.bind(userController));
export default router;
