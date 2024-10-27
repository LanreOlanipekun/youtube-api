"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secret_1 = __importDefault(require("../secret"));
const express_1 = __importDefault(require("../express"));
// import Database from '../database';
// import AccessControl from '../access-control';
class App {
    clearConsole() {
        process.stdout.write('\x1B[2J\x1B[0f');
    }
    loadEnvironment() {
        secret_1.default.init();
    }
    loadServer() {
        express_1.default.init();
    }
}
exports.default = new App();
//# sourceMappingURL=index.js.map