import { Request, Response, NextFunction } from "express";
import { AppError } from "../domain/errors/AppError";
import { DomainError, UserAlreadyExistsError, InvalidCredentialsError, EntityNotFoundError, InsufficientStockError } from "../domain/errors/DomainExceptions";
import { ZodError, ZodIssue } from "zod";

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
    res.status(409).json({ error: err.message });
    return;
  }

  if (err instanceof InvalidCredentialsError) {
    res.status(401).json({ error: err.message });
    return;
  }

  if (err instanceof EntityNotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  }

  if (err instanceof InsufficientStockError) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation Error",
      details: err.issues.map((e: ZodIssue) => ({ message: `${e.path.join('.')} is ${e.message}` }))
    });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};
