export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class UserAlreadyExistsError extends DomainError {
  constructor(message = "User already exists with this email") {
    super(message);
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor(message = "Invalid email or password") {
    super(message);
  }
}

export class EntityNotFoundError extends DomainError {
  constructor(entityName: string) {
    super(`${entityName} not found`);
  }
}

export class InsufficientStockError extends DomainError {
  constructor(itemName: string, available: number) {
    super(`Only ${available} units of "${itemName}" available`);
  }
}
