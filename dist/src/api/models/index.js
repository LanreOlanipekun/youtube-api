"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const exportedClasses = {};
function importClasses(directory) {
    const files = fs_1.default.readdirSync(directory);
    for (const file of files) {
        const filePath = path_1.default.join(directory, file);
        const stats = fs_1.default.statSync(filePath);
        if (stats.isDirectory()) {
            importClasses(filePath); // Recursive call for subfolders
        }
        else if (file === 'index.ts') {
            const importedModule = require(filePath);
            const classNames = Object.keys(importedModule).filter((key) => typeof importedModule[key] === 'function');
            for (const className of classNames) {
                exportedClasses[className] = importedModule[className];
            }
        }
    }
}
importClasses(__dirname);
exports.default = exportedClasses;
//# sourceMappingURL=index.js.map