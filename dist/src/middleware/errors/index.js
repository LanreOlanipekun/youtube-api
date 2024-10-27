"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secret_1 = __importDefault(require("../../modules/secret"));
const exceptions_1 = require("../../modules/exceptions");
const runtime_1 = require("@tsoa/runtime");
class Errors {
    errorMiddleware(err, req, res, next) {
        try {
            if (err instanceof runtime_1.ValidateError) {
                // handle tsoa validation error
                throw new exceptions_1.ValidationErrorHandler(Object.assign(Object.assign({}, exceptions_1.ValidationErrorHandler.RequestValidationFailed), { errors: err.fields }));
            }
            throw err;
        }
        catch (err) {
            const { status, message } = err;
            res.status(status || 500).json(Object.assign(Object.assign({}, (secret_1.default.App.env !== 'production' && err)), { status: undefined, name: err.name || this.constructor.name, code: err.code || exceptions_1.CommonErrorHandler.Fatal.code, message: message || exceptions_1.CommonErrorHandler.Fatal.message, errors: err.errors }));
        }
    }
}
exports.default = new Errors();
//# sourceMappingURL=index.js.map