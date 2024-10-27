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
exports.Http = void 0;
const config_1 = __importDefault(require("../../config"));
const logger_1 = require("../logger");
const exceptions_1 = require("../exceptions");
const got_1 = __importDefault(require("got"));
class Http {
    createDefaultException(url, err, request = {}, service, method = '') {
        var _a, _b;
        if (Number.isNaN(err.statusCode) ||
            !err.body ||
            !err.statusMessage ||
            typeof err.statusMessage !== 'string') {
            return new exceptions_1.CommonErrorHandler(exceptions_1.CommonErrorHandler.Fatal);
        }
        let code = exceptions_1.CommonErrorHandler.Fatal.code;
        let message = exceptions_1.CommonErrorHandler.Fatal.message;
        code = err.statusMessage.replace(/\s/g, '_').toUpperCase();
        let errObject = {};
        if (typeof err.body === 'string') {
            try {
                errObject = JSON.parse(err.body);
                message =
                    ((_a = errObject === null || errObject === void 0 ? void 0 : errObject.data) === null || _a === void 0 ? void 0 : _a.Reason) ||
                        (errObject === null || errObject === void 0 ? void 0 : errObject.Exception) ||
                        (errObject === null || errObject === void 0 ? void 0 : errObject.message) ||
                        (errObject === null || errObject === void 0 ? void 0 : errObject.responseText) ||
                        (errObject === null || errObject === void 0 ? void 0 : errObject.error_description) ||
                        (errObject === null || errObject === void 0 ? void 0 : errObject.remark) ||
                        ((_b = errObject === null || errObject === void 0 ? void 0 : errObject.error) === null || _b === void 0 ? void 0 : _b.message) ||
                        message;
            }
            catch (_c) {
                message = err.body;
            }
        }
        return new exceptions_1.ErrorHandler({
            code,
            message,
            status: +err.statusCode,
        });
    }
    constructor(baseUrl) {
        try {
            this.got = got_1.default.extend({
                baseUrl,
                timeout: config_1.default.got.timeout,
                headers: {
                    'Content-Type': 'application/json',
                },
                hooks: {
                    beforeError: [
                        (err) => {
                            return err;
                        },
                    ],
                },
            });
        }
        catch (err) {
            this.log.error(`${baseUrl} error: `, err);
        }
    }
    get(url = '', options = {}, service) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.got.get(url, options);
                return this.jsonResponse(options, response, url, service);
            }
            catch (err) {
                this.log.error(`Failure from service: ${service}, ${url}, method: GET error: ${JSON.stringify(err)}`);
                throw this.createDefaultException(url, err, options, service, 'GET');
            }
        });
    }
    post(url = '', options = {}, service) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.got.post(url, options);
                return this.jsonResponse(options, response, url, service);
            }
            catch (err) {
                this.log.error(`Failure from service: ${service}, method: POST error: ${JSON.stringify(err)}`);
                throw this.createDefaultException(url, err, options, service, 'POST');
            }
        });
    }
    patch(url = '', options = {}, service) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.got.patch(url, options);
                return this.jsonResponse(options, response, url, service);
            }
            catch (err) {
                this.log.error(`Failure from service: ${service}, method: PATCH error: ${JSON.stringify(err)}`);
                throw this.createDefaultException(url, err, options, service, 'PATCH');
            }
        });
    }
    delete(url = '', options = {}, service) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.got.delete(url, options);
                return this.jsonResponse(options, response, url, service);
            }
            catch (err) {
                this.log.error(`Failure from service: ${service}, ${url}, method: DELETE error: ${JSON.stringify(err)}`);
                throw this.createDefaultException(url, err, options, service, 'DELETE');
            }
        });
    }
    jsonResponse(request = {}, response, url, service) {
        const jsonResponse = JSON.parse(response.body);
        return jsonResponse;
    }
}
__decorate([
    (0, logger_1.LoggerDecorator)('Http'),
    __metadata("design:type", Object)
], Http.prototype, "log", void 0);
exports.Http = Http;
//# sourceMappingURL=index.js.map