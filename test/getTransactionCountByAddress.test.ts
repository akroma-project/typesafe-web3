import "@babel/polyfill";

import { TypeSafeWeb3 } from "../lib/index";

const sut = new TypeSafeWeb3();

describe("getTransactionCountByAddress", () => {
  it("should return the amount of transactions for an address", async () => {
    const result = await sut.getTransactionCountByAddress("0xf5e060a321650334973b044465427ea49815f755");
    expect(result.data).toBe(24);
  });
  it("should filter by t", async () => {
    const result = await sut.getTransactionCountByAddress("0xf5e060a321650334973b044465427ea49815f755", "t");
    expect(result.data).toBe(14);
  });
  it("should filter by f", async () => {
    const result = await sut.getTransactionCountByAddress("0xf5e060a321650334973b044465427ea49815f755", "f");
    expect(result.data).toBe(10);
  });
  it("should return zero when there are none", async () => {
    const result = await sut.getTransactionCountByAddress("0xf5e060a321650a34973b044465427ea49815f755");
    expect(result.data).toBe(0);
  });
});
