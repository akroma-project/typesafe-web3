"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const utils_1 = require("../utils");
class Transaction {
    constructor() {
        this.hash = "";
        this.blockHash = "";
        this.blockNumber = "";
        this.from = "";
        this.gas = "";
        this.gasPrice = "";
        this.input = "";
        this.nonce = "";
        this.to = "";
        this.transactionIndex = 0;
        this.value = "";
        this.v = "";
        this.r = "";
        this.s = "";
    }
    /**
     * Froms json
     * @param json returned from API call.
     * @returns transaction class object
     */
    static fromJSON(json, block) {
        const u = new utils_1.Utils();
        const transaction = Object.create(Transaction.prototype);
        const result = Object.assign(transaction, json, {
            gasPrice: u.toDecimal(json.gasPrice),
            gas: u.toDecimal(json.gas),
            nonce: u.toDecimal(json.nonce),
            blockNumber: u.toDecimal(json.blockNumber),
            value: u.fromWei(json.value, "ether"),
        });
        // console.log(result.value + 'tx: ' + json.hash);
        if (block && block.timestamp !== undefined) {
            const ts = block.timestamp;
            result.ts = u.toDecimal(ts);
        }
        return result;
    }
}
exports.Transaction = Transaction;
