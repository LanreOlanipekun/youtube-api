import { ErrorInterface } from './IError';
import { ErrorHandler } from './ErrorHandler';
import {
  DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize';

export class CommonErrorHandler extends ErrorHandler {
  constructor(err: ErrorInterface) {
    super(err);
  }

  public static get Fatal(): ErrorInterface {
    return {
      status: 500,
      code: 'FATAL',
      message: 'Fatal error',
    };
  }

  public static get InvalidForeignKey(): ErrorInterface {
    return {
      status: 400,
      code: 'INVALID_FOREIGN_KEY',
      message: 'Invalid foreign key',
    };
  }

  public static AlreadyExists(modelName: string = null): ErrorInterface {
    return {
      status: 400,
      code: 'ALREADY_EXIST',
      message: `${modelName} already exists`,
    };
  }

  public static handleSequelizeError(
    error: any,
    modelName: string = null
  ): ErrorInterface {
    if (error instanceof UniqueConstraintError) {
      return this.AlreadyExists(modelName);
    }

    if (error instanceof ForeignKeyConstraintError) {
      return this.InvalidForeignKey;
    }

    if (error instanceof DatabaseError) {
      return this.DatabaseError;
    }

    if (error instanceof ValidationError) {
      return this.ValidationFailed;
    }

    return {
      status: 500, // Default status code for Sequelize errors
      code: 'SEQUELIZE_ERROR',
      message: 'An error occurred during the database operation',
    };
  }

  public static get DatabaseError(): ErrorInterface {
    return {
      status: 500,
      code: 'DATABASE_ERROR',
      message: 'A database error occurred',
    };
  }

  public static get NotFound(): ErrorInterface {
    return {
      status: 404,
      code: 'NOT_FOUND',
      message: 'Not found',
    };
  }

  public static get ValidationFailed(): ErrorInterface {
    return {
      status: 400,
      code: 'VALIDATION_FAILED',
      message: 'Validation failed',
    };
  }
}
