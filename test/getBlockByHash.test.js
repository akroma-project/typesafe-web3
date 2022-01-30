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
describe("get block by hash", () => {
    it("should return a block when given a hash", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const result = yield sut.getBlockByHash("0x640fa41851368922cc0c1ccf9d040081ba098ac2208c2d78ac090ba4e101854e");
        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.transactions).toHaveLength(2);
    }));
});
