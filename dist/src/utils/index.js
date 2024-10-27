"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryString = void 0;
function getQueryString(data) {
    const keys = Object.keys(data);
    let newString = '';
    keys.forEach((key, index) => {
        if (index === 0) {
            if (data[key]) {
                newString = `?${key}=${data[key]}`;
            }
        }
        else if (data[key] !== undefined && data[key] !== null) {
            if (newString) {
                newString = `${newString}&${key}=${data[key]}`;
            }
            else {
                newString = `?${key}=${data[key]}`;
            }
        }
    });
    return newString;
}
exports.getQueryString = getQueryString;
//# sourceMappingURL=index.js.map