import { Request, Response, NextFunction } from "express";
import { AppError } from "../domain/errors/AppError";
import {UserAlreadyExistsError, InvalidCredentialsError, EntityNotFoundError, InsufficientStockError } from "../domain/errors/DomainExceptions";
import { ZodError, ZodIssue } from "zod";
import { HTTP_STATUS_CODES } from "../constants/HttpStatuscode";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof UserAlreadyExistsError) {
    res.status(HTTP_STATUS_CODES.CONFLICT).json({ error: err.message });
    return;
  }

  if (err instanceof InvalidCredentialsError) {
    res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ error: err.message });
    return;
  }

  if (err instanceof EntityNotFoundError) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: err.message });
    return;
  }

  if (err instanceof InsufficientStockError) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      error: "Validation Error",
      details: err.issues.map((e: ZodIssue) => ({ message: `${e.path.join('.')} is ${e.message}` }))
    });
    return;
  }

  console.error(err);
  res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
};
