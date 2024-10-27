"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorHandler = void 0;
const ErrorHandler_1 = require("./ErrorHandler");
class ValidationErrorHandler extends ErrorHandler_1.ErrorHandler {
    constructor(err) {
        super(err);
    }
    static get RequestValidationFailed() {
        return {
            status: 403,
            code: 'VALIDATION_ERROR',
            message: 'Request validation failed. Please crosscheck input fields',
        };
    }
}
exports.ValidationErrorHandler = ValidationErrorHandler;
//# sourceMappingURL=ValidationErrorHandler.js.map