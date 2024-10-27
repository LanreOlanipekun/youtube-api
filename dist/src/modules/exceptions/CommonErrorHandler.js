"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonErrorHandler = void 0;
const ErrorHandler_1 = require("./ErrorHandler");
const sequelize_1 = require("sequelize");
class CommonErrorHandler extends ErrorHandler_1.ErrorHandler {
    constructor(err) {
        super(err);
    }
    static get Fatal() {
        return {
            status: 500,
            code: 'FATAL',
            message: 'Fatal error',
        };
    }
    static get InvalidForeignKey() {
        return {
            status: 400,
            code: 'INVALID_FOREIGN_KEY',
            message: 'Invalid foreign key',
        };
    }
    static AlreadyExists(modelName = null) {
        return {
            status: 400,
            code: 'ALREADY_EXIST',
            message: `${modelName} already exists`,
        };
    }
    static handleSequelizeError(error, modelName = null) {
        if (error instanceof sequelize_1.UniqueConstraintError) {
            return this.AlreadyExists(modelName);
        }
        if (error instanceof sequelize_1.ForeignKeyConstraintError) {
            return this.InvalidForeignKey;
        }
        if (error instanceof sequelize_1.DatabaseError) {
            return this.DatabaseError;
        }
        if (error instanceof sequelize_1.ValidationError) {
            return this.ValidationFailed;
        }
        return {
            status: 500,
            code: 'SEQUELIZE_ERROR',
            message: 'An error occurred during the database operation',
        };
    }
    static get DatabaseError() {
        return {
            status: 500,
            code: 'DATABASE_ERROR',
            message: 'A database error occurred',
        };
    }
    static get NotFound() {
        return {
            status: 404,
            code: 'NOT_FOUND',
            message: 'Not found',
        };
    }
    static get ValidationFailed() {
        return {
            status: 400,
            code: 'VALIDATION_FAILED',
            message: 'Validation failed',
        };
    }
}
exports.CommonErrorHandler = CommonErrorHandler;
//# sourceMappingURL=CommonErrorHandler.js.map