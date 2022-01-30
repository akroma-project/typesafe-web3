"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@babel/polyfill");
const utils_1 = require("../lib/utils");
const u = new utils_1.Utils();
describe("Utils", () => {
    it("decode", () => {
        const v = u.toDecimal("0x2e7");
        expect(v).toBe(743);
        const t = u.toDecimal("0x18");
        expect(t).toBe(24);
    });
});
