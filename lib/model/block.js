"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const bignumber_js_1 = require("bignumber.js");
const utils_1 = require("../utils");
const transaction_1 = require("./transaction");
class Block {
    constructor() {
        this.hash = "";
        this.mixHash = "";
        this.parentHash = "";
        this.nonce = "";
        this.sha3Uncles = "";
        this.logsBloom = "";
        this.transactionsRoot = "";
        this.receiptsRoot = "";
        this.stateRoot = "";
        this.miner = "";
        this.difficulty = new bignumber_js_1.BigNumber(0);
        this.totalDifficulty = new bignumber_js_1.BigNumber(0);
        this.extraData = "";
        this.size = 0;
        this.gasLimit = 0;
        this.gasUsed = 0;
        this.uncles = [];
    }
    /**
     * Converts block properties into human readable format.
     * @param json returned from API call.
     * @returns block class object
     */
    static fromJSON(json) {
        const u = new utils_1.Utils();
        const block = Object.create(Block.prototype);
        const result = Object.assign(block, json, {
            gasLimit: u.toDecimal(json.gasLimit),
            gasUsed: u.toDecimal(json.gasUsed),
            size: u.toDecimal(json.size),
            timestamp: u.toDecimal(json.timestamp),
            difficulty: u.toBigNumber(json.difficulty),
            totalDifficulty: u.toBigNumber(json.totalDifficulty),
        });
        if (block.number !== undefined) {
            const blockNum = block.number;
            result.number = u.toDecimal(blockNum);
        }
        for (let index = 0; index < block.transactions.length; index++) {
            let tx = block.transactions[index];
            if (u.isAddress(tx) === false) {
                tx = transaction_1.Transaction.fromJSON(tx, block);
                block.transactions[index] = tx;
            }
        }
        return result;
    }
}
exports.Block = Block;
