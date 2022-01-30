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
describe("getTransactionsByAddress", () => {
    it("should return a list of transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield sut.getTransactionsByAddress("0xf5e060a321650334973b044465427ea49815f755");
        expect(result.data).toHaveLength(24);
    }));
    it("should filter by t", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield sut.getTransactionsByAddress("0xf5e060a321650334973b044465427ea49815f755", "t");
        expect(result.data).toHaveLength(14);
    }));
    it("should filter by f", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield sut.getTransactionsByAddress("0xf5e060a321650334973b044465427ea49815f755", "f");
        expect(result.data).toHaveLength(10);
    }));
});
