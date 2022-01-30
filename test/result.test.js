"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("../lib/model/result");
describe("success result", () => {
    it("should set ok as true", () => {
        const result = result_1.Result.success("data");
        expect(result.ok).toBeTruthy();
    });
    it("should return data", () => {
        const result = result_1.Result.success("data");
        expect(result.data).toBe("data");
    });
});
