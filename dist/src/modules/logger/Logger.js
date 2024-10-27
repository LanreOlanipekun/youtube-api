"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
/**
 * This is the main Logger Object.
 * A scope logger can be extended or can be used directly as the static log methods.
 */
class Logger {
    static parsePathToScope(filepath) {
        if (filepath.indexOf(path_1.default.sep) >= 0) {
            filepath = filepath
                .replace(process.cwd(), '')
                .replace(`${path_1.default.sep}src${path_1.default.sep}`, '')
                .replace(`${path_1.default.sep}dist${path_1.default.sep}`, '')
                .replace('.ts', '')
                .replace('.js', '')
                .replace(path_1.default.sep, ':');
        }
        return filepath;
    }
    /**
     * Constructor
     * @param scope - Logger label or file|dir path
     */
    constructor(scope) {
        this.scope = Logger.parsePathToScope(scope || Logger.DEFAULT_SCOPE);
        const loggerFormat = winston_1.default.format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        });
        this.logger = winston_1.default.createLogger({
            format: winston_1.default.format.combine(winston_1.default.format.label({ label: this.scope }), winston_1.default.format.timestamp(), loggerFormat),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    dirname: Logger.LOG_DIR,
                    filename: `${this.scope}.log`,
                })
            ]
        });
    }
    /**
     * Internal wrapper function for Winston Logger
     * @param level - Winston logger level: 'debug' | 'info' | 'warn' | 'error'
     * @param message - Logging message
     * @param args - Additional arguments
     */
    log(level, message, args) {
        this.logger[level](`${message}`, args);
    }
    /**
     * Used for logging debug process
     * @param message - Logging message
     * @param args - Additional arguments
     */
    debug(message, ...args) {
        this.log('debug', message, args);
    }
    /**
     * Used for logging info data
     * @param message - Logging message
     * @param args - Additional arguments
     */
    info(message, ...args) {
        this.log('info', message, args);
    }
    /**
     * Used for logging a warning
     * @param message - Logging message
     * @param args - Additional arguments
     */
    warn(message, ...args) {
        this.log('warn', message, args);
    }
    /**
     * Used for logging an error
     * @param message - Logging message
     * @param args - Additional arguments
     */
    error(message, ...args) {
        this.log('error', message, args);
    }
}
Logger.DEFAULT_SCOPE = 'app';
Logger.LOG_DIR = 'logs';
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map