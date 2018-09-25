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
    * get transactions by address
    * @param address
    * @param [page]
    * @returns {string[]} transactions by address
    */
    public async getTransactionsByAddress(address: string, page: number = -1): Promise<Result<string[]>> {
        return await this.send<string[]>('eth_getTransactionsByAddress', [address, 0, 'latest', 'tf', 'sc', page, -1, false]);
    }

    /**
   * get transactions and block by address
   * @param address
   * @param [page]
   * @returns get transactions by address, and block timestamp
   */
    public async getTransactionsAndBlockByAddress(address: string, page: number = -1): Promise<Result<Transaction[]>> {
        const transactions = await this.send<string[]>('eth_getTransactionsByAddress', [address, 0, 'latest', 'tf', 'sc', page, -1, false]);
        if (transactions.data === undefined || !transactions.ok) {
            return Result.error<Transaction[]>(transactions.message);
        }
        const result: Transaction[] = [];
        transactions.data.forEach(async element => {
            const tx = await this.getTransactionByHash(element);
            if (tx.data !== undefined && tx.ok) {
                const block = await this.getBlockByHash(tx.data.blockHash);
                if (block.ok && block.data !== undefined) {
                    result.push({
                        ...tx.data,
                        ts: block.data.timestamp,
                    });
                }
            }
        });
        return Result.success<Transaction[]>(result);
    }


    public async getTransactionByHash(hash: string): Promise<Result<Transaction>> {
        const result = await this.send<Transaction>('eth_getTransactionByHash', [hash]);
        if (result.ok && result.data !== undefined) {
            const b = Transaction.fromJSON(result.data, null);
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
        const blockNumberOrRequest = Utils.isString(numberOrString) ? numberOrString : Utils.toHex(numberOrString);
        const result = await this.send<Block>('eth_getBlockByNumber', [blockNumberOrRequest, includeTransactions]);
        console.error(JSON.stringify(result.data!.transactions));
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

