import "@babel/polyfill";

import { TypeSafeWeb3 } from "../lib/index";

const sut = new TypeSafeWeb3();

describe("getTransactionsAndBlockByAddress", () => {
  it("should return the 1st 10 transactions", async () => {
    const result = await sut.getTransactionsAndBlockByAddress("0xf5e060a321650334973b044465427ea49815f755", 0);
    expect(result.data).toHaveLength(10);
  });
  it("should be able to page of transactions by transaction index", async () => {
    const result = await sut.getTransactionsAndBlockByAddress("0xf5e060a321650334973b044465427ea49815f755", 1);
    expect(result.data).toHaveLength(10);
  });
  it("only return the last transactions (4) because we page by 10 and there are 104 total transactions", async () => {
    const result = await sut.getTransactionsAndBlockByAddress("0x082c720f520f650e12dfc908c3a383e90dda46b4", 10);
    expect(result.data).toHaveLength(4);
    // print(result);
  });
});
