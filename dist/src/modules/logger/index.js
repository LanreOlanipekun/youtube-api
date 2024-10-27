"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LoggerDecorator = void 0;
const Logger_1 = require("./Logger");
/**
 * Parameter logger decorator
 * @param scope - Logger label or file | dir path
 */
function LoggerDecorator(scope) {
    return (target, propertyKey) => {
        const logger = new Logger_1.Logger(scope);
        target[propertyKey] = logger;
    };
}
exports.LoggerDecorator = LoggerDecorator;
var Logger_2 = require("./Logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return Logger_2.Logger; } });
//# sourceMappingURL=index.js.map