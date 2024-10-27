"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponseObject = exports.ResponseTypeEnum = void 0;
var ResponseTypeEnum;
(function (ResponseTypeEnum) {
    ResponseTypeEnum["SUCCESS"] = "success";
    ResponseTypeEnum["FAILED"] = "failed";
})(ResponseTypeEnum = exports.ResponseTypeEnum || (exports.ResponseTypeEnum = {}));
class SuccessResponseObject {
    constructor(data, message, status = ResponseTypeEnum.SUCCESS) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}
exports.SuccessResponseObject = SuccessResponseObject;
//# sourceMappingURL=response.js.map