import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

import { RegisterUser } from "../../application/use_cases/RegisterUser";
import { RefreshAccessToken } from "../../application/use_cases/RefreshAccessToken";
import { LoginUser } from "../../application/use_cases/LoginUser";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../constants/ErrorMessage";
import { AuthenticatedRequest } from "../../middleware/AuthMiddleware";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email, password } = req.body;
    
      const registerUser = container.resolve(RegisterUser);
      const user = await registerUser.execute({ fullName, email, password });

      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const loginUser = container.resolve(LoginUser);
    const { accessToken, refreshToken, user } = await loginUser.execute({ email, password });

    // ✅ Set refreshToken in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      user,
    });
  } catch (err) {
    next(err);
  }
}

static async refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies["refreshToken"];

    const refreshUseCase = container.resolve(RefreshAccessToken);
    const accessToken = refreshUseCase.execute(refreshToken);

     res.status(HTTP_STATUS_CODES.OK).json({ accessToken });
  } catch (err) {
    next(err);
  }
}
static async getMe(req:AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    res.status(HTTP_STATUS_CODES.OK).json({ user: req.user });
  } catch (err) {
    next(err);
  }
}

static async logout(req: Request, res: Response, next: NextFunction) {
  try {

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

     res.status(HTTP_STATUS_CODES.OK).json({ message: ERROR_MESSAGES.LOGOUT_SUCCESS });
  } catch (err) {
    next(err);
  }
}
}
