"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerJson = exports.RegisterRoutes = void 0;
const routes_1 = require("./routes");
Object.defineProperty(exports, "RegisterRoutes", { enumerable: true, get: function () { return routes_1.RegisterRoutes; } });
const swagger_json_1 = __importDefault(require("./swagger.json"));
exports.SwaggerJson = swagger_json_1.default;
//# sourceMappingURL=index.js.map