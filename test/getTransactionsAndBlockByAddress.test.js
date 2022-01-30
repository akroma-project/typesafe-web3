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
describe("getTransactionsAndBlockByAddress", () => {
    it("should return the 1st 10 transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield sut.getTransactionsAndBlockByAddress("0xf5e060a321650334973b044465427ea49815f755", 0);
        expect(result.data).toHaveLength(10);
    }));
    it("should be able to page of transactions by transaction index", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield sut.getTransactionsAndBlockByAddress("0xf5e060a321650334973b044465427ea49815f755", 1);
        expect(result.data).toHaveLength(10);
    }));
    it("only return the last transactions (4) because we page by 10 and there are 104 total transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield sut.getTransactionsAndBlockByAddress("0x082c720f520f650e12dfc908c3a383e90dda46b4", 10);
        expect(result.data).toHaveLength(4);
    }));
});
