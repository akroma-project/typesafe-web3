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
describe("get transaction by hash", () => {
    it("should return transaction for given hash", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const result = yield sut.getTransactionByHash("0x1c0a0ecbb51a6cd21a05152257b802e708061d27b7124b87eff2732d546d9ebc");
        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.blockNumber).toBe(1614446);
        expect((_b = result.data) === null || _b === void 0 ? void 0 : _b.from).toBe("0x4b0b5abfb408ec93a40369fb1ed29e29d5504a43");
    }));
});
