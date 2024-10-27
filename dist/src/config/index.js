"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secret_1 = __importDefault(require("../modules/secret"));
exports.default = {
    dirs: {
        public: 'public',
    },
    got: {
        retry: {
            limit: 3,
            methods: ['GET', 'PUT', 'DELETE'],
            statusCodes: [408, 413, 429, 500, 502, 503, 504],
        },
        timeout: 30000,
    },
    rateLimiter: {
        time: 60000,
        maxNumberOfRequest: 100,
    },
    swagger: {
        route: '/api/docs',
    },
    corsOptions: {
        origin: secret_1.default.Cors.origin,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Accept',
            'Content-Length',
            'Content-Type',
            'Authorization',
            'boundary',
            'VFDBankAuth',
            'API-Key',
        ],
        credentials: true,
        preflightContinue: false,
    },
};
//# sourceMappingURL=index.js.map