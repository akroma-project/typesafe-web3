"use strict";
/*! *****************************************************************************
Copyright (c) Akroma, Akroma.org. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeSafeWeb3 = void 0;
const axios_1 = __importDefault(require("axios"));
const block_1 = require("./model/block");
const result_1 = require("./model/result");
const transaction_1 = require("./model/transaction");
const utils_1 = require("./utils");
const u = new utils_1.Utils();
/**
 * Type safe web3
 * Goals:
 * - http client first
 * - never throw
 * - strong type for all requests
 * - strong type for all responses
 * - never any
 */
class TypeSafeWeb3 {
    constructor(url = "http://localhost:8545") {
        this.url = url;
    }
    /**
     * get balance
     * @param address {String}
     * @param tag optional {Number|String} 'latest', 'earliest', 'pending'
     * @returns balance {String} in wei
     */
    getBalance(address, tag = "latest") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.send("eth_getBalance", [address, tag]);
        });
    }
    /**
     * get balance
     * @param address {String}
     * @returns amount of transactions {String} hex encoded
     */
    getTransactionCountByAddress(address, direction = "tf") {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.send("eth_getTransactionCountByAddress", [address, 0, "latest", direction, "sc", false]);
            result.data = result.ok ? u.toDecimal(result.data) : result.data;
            return result;
        });
    }
    /**
     * get transactions by address
     * @param address
     * @returns {string[]} transactions by address
     */
    getTransactionsByAddress(address, direction = "tf") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.send("eth_getTransactionsByAddress", [address, 0, "latest", direction, "sc", 0, -1, false]);
        });
    }
    /**
     * get transactions and block by address
     * @param address
     * @param [page]
     * @returns get transactions by address, and block timestamp
     */
    getTransactionsAndBlockByAddress(address, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page < 0) {
                return result_1.Result.error("page must be greater then 0");
            }
            const start = page === 0 ? 0 : page * 10;
            const end = start + 10;
            const transactions = yield this.send("eth_getTransactionsByAddress", [address, 0, "latest", "tf", "sc", start, end, false]);
            if (!transactions.ok) {
                return result_1.Result.error(transactions.message);
            }
            const result = [];
            for (let index = 0; index < transactions.data.length; index++) {
                const element = transactions.data[index];
                const tx = yield this.getTransactionByHash(element);
                if (tx.ok) {
                    const block = yield this.getBlockByHash(tx.data.blockHash);
                    if (block.ok) {
                        result.push(Object.assign(Object.assign({}, tx.data), { ts: block.data.timestamp }));
                    }
                }
            }
            return result_1.Result.success(result);
        });
    }
    getTransactionByHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.send("eth_getTransactionByHash", [hash]);
            if (result.ok) {
                const b = transaction_1.Transaction.fromJSON(result.data, null);
                return result_1.Result.success(b);
            }
            return result;
        });
    }
    /**
     * Gets block by hash, because block entity has methods,
     * we create a real block not just pass type coerced response back.
     * @param hash
     * @returns block by hash
     */
    getBlockByHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.send("eth_getBlockByHash", [hash, false]);
            if (result.ok && result.data !== undefined) {
                const b = block_1.Block.fromJSON(result.data);
                return result_1.Result.success(b);
            }
            return result;
        });
    }
    /**
     * Gets block by number
     * @param numberOrString number | string ('latest', 'pending', 'earliest')
     * @param includeTransactions boolean - include full transactions, default false
     * @returns block by number
     */
    getBlockByNumber(numberOrString, includeTransactions = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const blockNumberOrRequest = u.isString(numberOrString) ? numberOrString : u.toHex(numberOrString);
            const result = yield this.send("eth_getBlockByNumber", [blockNumberOrRequest, includeTransactions]);
            if (result.ok && result.data !== undefined) {
                const b = block_1.Block.fromJSON(result.data); // convert block properties into human readable.
                return result_1.Result.success(b);
            }
            return result;
        });
    }
    getContractTransfers(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const transferHash = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
            const fromBlock = "0x0";
            const result = yield this.send("eth_getLogs", [{ address, fromBlock, topics: [transferHash] }]);
            if (result.ok && result.data !== undefined) {
                // const b = Block.fromJSON(result.data);
                return result_1.Result.success(result.data);
            }
            return result;
        });
    }
    listening() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.send("net_listening");
        });
    }
    send(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify({
                jsonrpc: "2.0",
                method,
                params,
                id: 1, // TODO: random and return request id.
            });
            try {
                const response = yield axios_1.default.post(this.url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.data.error !== undefined) {
                    return result_1.Result.error(response.data.error.message);
                }
                return result_1.Result.success(response.data.result);
            }
            catch (error) {
                // all non-200 responses end up here.
                const err = error;
                return result_1.Result.error(err.message);
            }
        });
    }
}
exports.TypeSafeWeb3 = TypeSafeWeb3;
