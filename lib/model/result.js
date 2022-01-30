"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor() {
        this.message = "";
        this.ok = false;
    }
    static success(data) {
        const result = new Result();
        result.ok = true;
        result.data = data;
        return result;
    }
    static error(message = "") {
        const result = new Result();
        result.message = message;
        return result;
    }
}
exports.Result = Result;
