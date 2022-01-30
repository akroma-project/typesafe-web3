import "@babel/polyfill";

import { TypeSafeWeb3 } from "../lib/index";

const sut = new TypeSafeWeb3();

describe("getTransactionsByAddress", () => {
  it("should return a list of transactions", async () => {
    const result = await sut.getTransactionsByAddress("0xf5e060a321650334973b044465427ea49815f755");

    expect(result.data).toHaveLength(24);
  });
  it("should filter by t", async () => {
    const result = await sut.getTransactionsByAddress("0xf5e060a321650334973b044465427ea49815f755", "t");

    expect(result.data).toHaveLength(14);
  });
  it("should filter by f", async () => {
    const result = await sut.getTransactionsByAddress("0xf5e060a321650334973b044465427ea49815f755", "f");

    expect(result.data).toHaveLength(10);
  });
});
