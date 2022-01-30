"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@babel/polyfill");
const index_1 = require("../lib/index");
const sut = new index_1.TypeSafeWeb3();
describe("get block by number", () => {
    it("should get block by number", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const result = yield sut.getBlockByNumber(1661071, true);
        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.transactions).toHaveLength(2);
    }));
    it("should get `latest` block", () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const result = yield sut.getBlockByNumber("latest");
        expect((_b = result.data) === null || _b === void 0 ? void 0 : _b.number).toBeGreaterThan(6355298);
    }));
});
