import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { AuthService } from '../application/services/AuthServices'; 
import { TokenPayload } from '../shared/AuthTypes';
import { ERROR_MESSAGES } from '../constants/ErrorMessage';
import { AppError } from '../domain/errors/AppError';
import { HTTP_STATUS_CODES } from '../constants/HttpStatuscode';

// Extending the request object
export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

@injectable()
export class AuthMiddleware {
  constructor(
    @inject("IAuthService")
    private authService: AuthService
  ) {}

  protectRoute = () => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer")) {
         throw new AppError(ERROR_MESSAGES.NO_TOKEN_PROVIDED, HTTP_STATUS_CODES.UNAUTHORIZED);
      }

      const token = authHeader.split(" ")[1];

      try {
        const decoded = this.authService.verifyAccessToken(token);
        req.user = decoded;
        next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
         throw new AppError(ERROR_MESSAGES.NO_TOKEN_PROVIDED, HTTP_STATUS_CODES.UNAUTHORIZED);

       
      }
    };
  };
}
