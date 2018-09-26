import Utils from '../utils';
import { Block } from './block';

export class Transaction {
    public hash = '';
    public blockHash = '';
    public blockNumber = '';
    public from = '';
    public gas = '';
    public gasPrice = '';
    public input = '';
    public nonce = '';
    public to = '';
    public transactionIndex = 0;
    public value = '';
    public v = '';
    public r = '';
    public s = '';
    /**
     * timestamp comes from the block.
     */
    public ts: number | string | undefined;

    /**
    * Froms json
    * @param json returned from API call.
    * @returns transaction class object
    */
    public static fromJSON(json: Transaction, block: Block | null): Transaction {
        const transaction = Object.create(Transaction.prototype);
        const result = Object.assign(transaction, json, {
            gasPrice: Utils.toDecimal(json.gasPrice),
            gas: Utils.toDecimal(json.gas),
            nonce: Utils.toDecimal(json.nonce),
            blockNumber: Utils.toDecimal(json.blockNumber),
            value: Utils.fromWei(json.value, 'ether'),
        });
        // console.log(result.value + 'tx: ' + json.hash);
        if (block && block.timestamp !== undefined) {
            const ts = block.timestamp as number;
            result.ts = Utils.toDecimal(ts);
        }
        return result;
    }
}
