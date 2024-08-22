import { STATUS_CODE } from "./statusCode";

class BaseError extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly message: string;

  constructor(name: string, status: number, description: string) {
    super(description);
    this.name = name;
    this.message = description;
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

// Internal Error 500
export class APIError extends BaseError {
  constructor(description = "Api Error") {
    super(
      "API internal server error",
      STATUS_CODE.INTERNAL_ERROR,
      description,
    );
  }
}

//Validation Errors 400

export class ValidationError extends BaseError {
  constructor(description = "Bad Request") {
    super("Bad Request", STATUS_CODE.BAD_REQUEST, description);
  }
}

// Authorization Error 403

export class AuthorizeError extends BaseError {
  constructor(description = "Access Denied") {
    super("Access Denied", STATUS_CODE.UNAUTHORIZED, description);
  }
}

// Not found 404

export class NotFoundError extends BaseError {
  constructor(description = "Not found!") {
    super(description, STATUS_CODE.NOT_FOUND, description);
  }
}
