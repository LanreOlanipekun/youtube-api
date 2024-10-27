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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const middleware_1 = require("../../middleware");
const config_1 = __importDefault(require("../../config"));
const secret_1 = __importDefault(require("../secret"));
const logger_1 = require("../logger");
const routes_1 = require("../routes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Express {
    constructor() {
        this.express = (0, express_1.default)();
    }
    disablePoweredByNodejs() {
        this.express.disable('x-powered-by');
    }
    mountStatics() {
        this.express.use('/core/public', express_1.default.static(config_1.default.dirs.public));
    }
    mountBodyParser() {
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    mountCookieParserAndCors() {
        const options = config_1.default.corsOptions;
        this.express.use((0, cors_1.default)(options));
        this.express.use(express_1.default.json());
        this.express.use((0, cookie_parser_1.default)());
    }
    mountErrorHandlers() {
        this.express.use(middleware_1.Errors.errorMiddleware.bind(middleware_1.Errors));
    }
    mountRoutes() {
        this.express.use(config_1.default.swagger.route, swagger_ui_express_1.default.serve, (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.send(swagger_ui_express_1.default.generateHTML(routes_1.SwaggerJson));
        }));
        const limiter = (0, express_rate_limit_1.default)({
            windowMs: config_1.default.rateLimiter.time,
            max: config_1.default.rateLimiter.maxNumberOfRequest,
            standardHeaders: true,
            legacyHeaders: false,
            handler: (req, res, next, options) => res
                .status(options.statusCode)
                .send({ message: options.message, code: 'RATE_LIMIT_EXCEEDED' }),
        });
        (0, routes_1.RegisterRoutes)(this.express.use(limiter));
    }
    mountHelmet() {
        // Define the max-age (e.g., 1 year in seconds)
        const maxAge = 31536000; // 1 year in seconds
        // Use helmet to set various HTTP headers for security
        this.express.use((0, helmet_1.default)());
        // Prevent clickjacking
        this.express.use(helmet_1.default.frameguard({
            action: 'deny', // or 'sameorigin' if you want to allow same origin framing
        }));
        // Set HSTS header with includeSubDomains and preload
        this.express.use(helmet_1.default.hsts({
            maxAge,
            includeSubDomains: true,
            preload: true,
        }));
    }
    /**
     * Starts the express server
     */
    init() {
        try {
            // Mount necessary express settings
            this.disablePoweredByNodejs();
            this.mountStatics();
            this.mountBodyParser();
            this.mountCookieParserAndCors();
            this.mountHelmet();
            this.mountRoutes();
            this.mountErrorHandlers();
            // Start the server on the specified port
            this.express.listen(process.env.PORT || secret_1.default.App.port, () => {
                this.log.info(`Server launched on host: ${secret_1.default.App.host}:${secret_1.default.App.port}`);
            });
        }
        catch (err) {
            this.log.error(`Server got an error: ${err.message}`);
            throw err;
        }
    }
    get Server() {
        return this.express;
    }
}
__decorate([
    (0, logger_1.LoggerDecorator)('Server'),
    __metadata("design:type", Object)
], Express.prototype, "log", void 0);
exports.default = new Express();
//# sourceMappingURL=index.js.map