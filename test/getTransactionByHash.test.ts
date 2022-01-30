import "@babel/polyfill";

import { TypeSafeWeb3 } from "../lib/index";

const sut = new TypeSafeWeb3();

describe("get transaction by hash", () => {
  it("should return transaction for given hash", async () => {
    const result = await sut.getTransactionByHash("0x1c0a0ecbb51a6cd21a05152257b802e708061d27b7124b87eff2732d546d9ebc");
    expect(result.data?.blockNumber).toBe(1614446);
    expect(result.data?.from).toBe("0x4b0b5abfb408ec93a40369fb1ed29e29d5504a43");
  });
});
