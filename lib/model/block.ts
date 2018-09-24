import { BigNumber } from 'bignumber.js';
import Utils from '../utils';

export class Block {
    public number: number | undefined;
    public hash: string | null = '';
    public mixHash: string | null = '';
    public parentHash = '';
    public nonce = '';
    public sha3Uncles = '';
    public logsBloom = '';
    public transactionsRoot = '';
    public receiptsRoot = '';
    public stateRoot = '';
    public miner = '';
    public difficulty: BigNumber = new BigNumber(0);
    public totalDifficulty: BigNumber = new BigNumber(0);
    public extraData = '';
    public size = 0;
    public gasLimit = 0;
    public gasUsed = 0;
    public timestamp: number | string | undefined;
    public uncles: string[] = [];
    public transactions: string[] = [];


    /**
     * Froms json
     * @param json returned from API call.
     * @returns block class object
     */
    public static fromJSON(json: Block): Block {
        const block = Object.create(Block.prototype);
        const result = Object.assign(block, json, {
            gasLimit: Utils.toDecimal(json.gasLimit),
            gasUsed: Utils.toDecimal(json.gasUsed),
            size: Utils.toDecimal(json.size),
            timestamp: Utils.toDecimal(json.timestamp!),
            difficulty: Utils.toBigNumber(json.difficulty),
            totalDifficulty: Utils.toBigNumber(json.totalDifficulty),
        });
        if (block.number !== undefined) {
            const number = block.number as number;
            result.number = Utils.toDecimal(number);
        }
        return result;
    }
}
