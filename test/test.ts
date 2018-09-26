import { expect } from 'chai';
import { TypeSafeWeb3 } from '../lib/index';
import { Result } from '../lib/model/result';
import Utils from '../lib/utils';

const sut = new TypeSafeWeb3();

describe('api', () => {
    it('should have a listening method', async () => {
        const result = await sut.listening();
        // print(result);
        // tslint:disable-next-line:no-unused-expression
        expect(result.data).to.be.true;
        // tslint:disable-next-line:no-unused-expression
        expect(result.ok).to.be.true;
    });

    it('should get block by hash', async () => {
        const result = await sut.getBlockByHash('0x640fa41851368922cc0c1ccf9d040081ba098ac2208c2d78ac090ba4e101854e');
        // print(result);
        expect(result.data!.transactions).to.have.length(2);
    });

    it('should get block by number', async () => {
        const result = await sut.getBlockByNumber(1661071, true);
        // print(result);
        expect(result.data!.transactions).to.have.length(2);
    });

    it('should get block by number', async () => {
        // const result = await sut.getBlockByNumber('latest');
        // print(result);
    });

    it('should get transactions for address', async () => {
        const result = await sut.getTransactionsByAddress('0xf5e060a321650334973b044465427ea49815f755');
        // print(result);
        expect(result.data).to.have.length(24);
    });

    it('should get transactions by hash', async () => {
        const result = await sut.getTransactionByHash('0x1c0a0ecbb51a6cd21a05152257b802e708061d27b7124b87eff2732d546d9ebc');
        // print(result);
    });

    it('should get balance for address', async () => {
        const result = await sut.getBalance('0xd568ba7c2239ce5c93d500c975f0e341a6fb5326');
        print(result);
        const value = Utils.fromWei(result.data!, 'ether');
        console.log(value);
    });
});


function print(result: Result<any>) {
    console.log('message:' + result.message);
    console.log('ok:' + result.ok);
    console.log('data:' + JSON.stringify(result.data));
}