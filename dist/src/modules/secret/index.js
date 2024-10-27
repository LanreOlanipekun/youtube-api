"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const logger_1 = require("../logger");
class Secret {
    constructor() {
        if (fs_1.default.existsSync('.env')) {
            dotenv_1.default.config({ path: '.env' });
            this.log.info('Environment variables have been loaded successfully.');
        }
        else {
            const err = new Error('Could not find .env file to supply config environment variables.');
            this.log.error(err.message);
            throw err;
        }
    }
    init() {
        if (fs_1.default.existsSync('.env')) {
            dotenv_1.default.config({ path: '.env' });
            this.log.info('Environment variables have been loaded successfully.');
        }
        else {
            const err = new Error('Could not find .env file to supply config environment variables.');
            this.log.error(err.message);
            throw err;
        }
    }
    getOsEnv(key) {
        if (typeof process.env[key] === 'undefined') {
            throw new Error(`Environment variable ${key} is not set.`);
        }
        return process.env[key];
    }
    toNumber(value) {
        return parseInt(value, 10);
    }
    toBool(value) {
        return value === 'true';
    }
    /**
     * Get full an element path from the project root folder
     * @param path - Path to a file or directory
     */
    getPath(path) {
        return (0, path_1.join)(process.cwd(), path);
    }
    /**
     * App environment
     */
    get App() {
        try {
            return {
                name: this.getOsEnv('APP_NAME'),
                env: this.getOsEnv('APP_ENVIRONMENT'),
                host: this.getOsEnv('APP_HOST'),
                port: this.toNumber(this.getOsEnv('APP_PORT')),
            };
        }
        catch (err) {
            this.log.error(`App env error: ${err.message}`);
            throw err;
        }
    }
    /**
     * DB environment
     */
    // public get Db(): DbEnvInterface {
    //   try {
    //     return {
    //       dialect: this.getOsEnv('DB_CONNECTION') as DatabaseDialectType,
    //       database: this.getOsEnv('DB_DATABASE'),
    //       username: this.getOsEnv('DB_USERNAME'),
    //       password: this.getOsEnv('DB_PASSWORD'),
    //       host: this.getOsEnv('DB_HOST'),
    //       port: this.toNumber(this.getOsEnv('DB_PORT')),
    //     };
    //   } catch (err) {
    //     this.log.error(`Database env error: ${err.message}`);
    //     throw err;
    //   }
    // }
    /**
     * Urls environment
     */
    get Urls() {
        try {
            return {
                client: this.getOsEnv('URL_CLIENT'),
                youtubeBaseUrl: this.getOsEnv('YOUTUBE_BASE_URL'),
                googleApiKey: this.getOsEnv('GOOGLE_API_KEY'),
            };
        }
        catch (err) {
            this.log.error(`Cba env error: ${err.message}`);
            throw err;
        }
    }
    /**
     * Cors
     */
    get Cors() {
        var _a;
        try {
            return {
                origin: [
                    this.Urls.client,
                    ...(((_a = this.getOsEnv('CORS_ORIGIN')) === null || _a === void 0 ? void 0 : _a.split(',')) || []),
                ],
            };
        }
        catch (err) {
            this.log.error(`Cors error: ${err.message}`);
            throw err;
        }
    }
}
__decorate([
    (0, logger_1.LoggerDecorator)('Env'),
    __metadata("design:type", Object)
], Secret.prototype, "log", void 0);
exports.default = new Secret();
//# sourceMappingURL=index.js.map