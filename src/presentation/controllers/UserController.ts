import { Request, Response, NextFunction } from "express";
import {inject, singleton } from "tsyringe";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../constants/ErrorMessage";
import { AuthenticatedRequest } from "../../middleware/AuthMiddleware";
import { ILoginUserUseCase } from "../../application/use_cases/Auth/ILoginUserUseCase";
import { IUserAuthUseCase } from "../../application/use_cases/Auth/IRegisterAuthUseCase";
import { IRefreshAccessTokenUseCase } from "../../application/use_cases/Auth/IRefreshAccessTokenUseCase";
import { registerSchema, loginSchema } from "../validators/UserValidator";

@singleton()
export class UserController {
    constructor(
    @inject("ILoginUserUseCase")
   private _loginUserUseCase: ILoginUserUseCase,
   @inject("IUserAuthUseCase")
   private _registerUseCase:IUserAuthUseCase,
   @inject("IRefreshAccessTokenUseCase")
   private _refreshTokenUseCase:IRefreshAccessTokenUseCase
  ) {}
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validData = registerSchema.parse({ body: req.body });
    
      const user = await this._registerUseCase.execute(validData.body);

      res.status(HTTP_STATUS_CODES.CREATED).json({ user });
    } catch (err) {
      next(err);
    }
  }
 async login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validData = loginSchema.parse({ body: req.body });
    const { accessToken, refreshToken, user } = await this._loginUserUseCase.execute(validData.body);
    
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" as const : "lax" as const,
      maxAge: parseInt(process.env.COOKIE_MAX_AGE || "604800000", 10),
    };

    // ✅ Set refreshToken in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(HTTP_STATUS_CODES.OK).json({
      accessToken,
      user,
    });
  } catch (err) {
    next(err);
  }
}

 async refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies["refreshToken"];

    const accessToken =await this._refreshTokenUseCase.execute(refreshToken);

     res.status(HTTP_STATUS_CODES.OK).json({ accessToken });
  } catch (err) {
    next(err);
  }
}
 async getMe(req:AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
        throw new Error("User required");
    }
    res.status(HTTP_STATUS_CODES.OK).json({ user: req.user });
  } catch (err) {
    next(err);
  }
}

 async logout(req: Request, res: Response, next: NextFunction) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" as const : "lax" as const,
      maxAge: parseInt(process.env.COOKIE_MAX_AGE || "604800000", 10),
    };

    res.clearCookie("refreshToken", cookieOptions);
  
     res.status(HTTP_STATUS_CODES.OK).json({ message: ERROR_MESSAGES.LOGOUT_SUCCESS });
  } catch (err) {
    next(err);
  }
}
}
