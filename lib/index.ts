/*! *****************************************************************************
Copyright (c) Akroma, Akroma.io. All rights reserved.
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

import axios, { AxiosError } from 'axios';
import { Block } from './model/block';
import { NetworkResponse, Result } from './model/result';
import { Transaction } from './model/transaction';
import Utils from './utils';
const u = new Utils();

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

    public readonly url: string;
    public constructor(url: string = 'http://localhost:8545') {
        this.url = url;
    }

    /**
     * get balance
     * @param address {String}
     * @param tag optional {Number|String} 'latest', 'earliest', 'pending'
     * @returns balance {String} in wei
     */
    public async getBalance(address: string, tag: number | string = 'latest'): Promise<Result<string>> {
        return await this.send<string>('eth_getBalance', [address, tag]);
    }

    /**
    * get balance
    * @param address {String}
    * @returns amount of transactions {String} hex encoded
    */
    public async getTransactionCountByAddress(address: string, direction: string = 'tf'): Promise<Result<number>> {
        const result = await this.send<number>('eth_getTransactionCountByAddress', [address, 0, 'latest', direction, 'sc', false]);
        result.data = (result.ok) ? u.toDecimal(result.data!) : result.data;
        return result;
    }

    /**
    * get transactions by address
    * @param address
    * @returns {string[]} transactions by address
    */
    public async getTransactionsByAddress(address: string, direction: string = 'tf'): Promise<Result<string[]>> {
        return await this.send<string[]>('eth_getTransactionsByAddress', [address, 0, 'latest', direction, 'sc', 0, -1, false]);
    }

    /**
   * get transactions and block by address
   * @param address
   * @param [page]
   * @returns get transactions by address, and block timestamp
   */
    public async getTransactionsAndBlockByAddress(address: string, page: number = 0): Promise<Result<Transaction[]>> {
        if (page < 0) {
            return Result.error<Transaction[]>('page must be greater then 0');
        }
        const start = page === 0 ? 0 : page * 10;
        const end = start + 10;
        const transactions = await this.send<string[]>('eth_getTransactionsByAddress', [address, 0, 'latest', 'tf', 'sc', start, end, false]);
        if (!transactions.ok) {
            return Result.error<Transaction[]>(transactions.message);
        }
        const result: Transaction[] = [];
        for (let index = 0; index < transactions.data!.length; index++) {
            const element = transactions.data![index];
            const tx = await this.getTransactionByHash(element);
            if (tx.ok) {
                const block = await this.getBlockByHash(tx.data!.blockHash);
                if (block.ok) {
                    result.push({
                        ...tx.data!,
                        ts: block.data!.timestamp,
                    });
                }
            }
        }
        return Result.success<Transaction[]>(result);
    }


    public async getTransactionByHash(hash: string): Promise<Result<Transaction>> {
        const result = await this.send<Transaction>('eth_getTransactionByHash', [hash]);
        if (result.ok) {
            const b = Transaction.fromJSON(result.data!, null);
            return Result.success<Transaction>(b);
        }
        return result;
    }

    /**
     * Gets block by hash, because block entity has methods,
     * we create a real block not just pass type coerced response back.
     * @param hash
     * @returns block by hash
     */
    public async getBlockByHash(hash: string | null): Promise<Result<Block>> {
        const result = await this.send<Block>('eth_getBlockByHash', [hash, false]);
        if (result.ok && result.data !== undefined) {
            const b = Block.fromJSON(result.data);
            return Result.success<Block>(b);
        }
        return result;
    }

    /**
    * Gets block by number
    * @param numberOrString number | string ('latest', 'pending', 'earliest')
    * @param includeTransactions boolean - include full transactions, default false
    * @returns block by number
    */
    public async getBlockByNumber(numberOrString: string | number, includeTransactions: boolean = false): Promise<Result<Block>> {
        const blockNumberOrRequest = u.isString(numberOrString) ? numberOrString : u.toHex(numberOrString);
        const result = await this.send<Block>('eth_getBlockByNumber', [blockNumberOrRequest, includeTransactions]);
        if (result.ok && result.data !== undefined) {
            const b = Block.fromJSON(result.data); // convert block properties into human readable.
            return Result.success<Block>(b);
        }
        return result;
    }

    public async listening(): Promise<Result<boolean>> {
        return await this.send<boolean>('net_listening');
    }

    private async send<T>(method: string, params?: object): Promise<Result<T>> {
        const data = JSON.stringify({
            'jsonrpc': '2.0',
            'method': method,
            'params': params,
            'id': 1, // TODO: random and return request id.
        });
        try {
            const response = await axios.post<NetworkResponse<T>>(this.url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.error !== undefined) {
                return Result.error<T>(response.data.error.message);
            }
            return Result.success<T>(response.data.result);
        } catch (error) { // all non-200 responses end up here.
            const err = error as AxiosError;
            return Result.error<T>(err.message);
        }
    }
}

export { TypeSafeWeb3 };

