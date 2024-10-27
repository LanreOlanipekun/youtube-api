"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(err) {
        super(err.message);
        this.status = err.status;
        this.name = this.constructor.name;
        this.code = err.code;
        this.errors = err.errors;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map