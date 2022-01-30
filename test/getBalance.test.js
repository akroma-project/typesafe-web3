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
const utils_1 = require("../lib/utils");
const u = new utils_1.Utils();
const sut = new index_1.TypeSafeWeb3();
describe("get balance", () => {
    it("should get balance for address", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const result = yield sut.getBalance("0xd568ba7c2239ce5c93d500c975f0e341a6fb5326");
        const value = u.fromWei((_a = result.data) !== null && _a !== void 0 ? _a : "", "ether");
        expect(value).toBe("2030.0313919397");
    }));
});
