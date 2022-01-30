import "@babel/polyfill";

import { TypeSafeWeb3 } from "../lib/index";

const sut = new TypeSafeWeb3();

describe("getContractTransfers", () => {
  it("should return a list of transactions", async () => {
    const result = await sut.getContractTransfers("0x853E140FeA204f32dAEAEa3d067379F8827A1f23");
    console.log(result.data);
    expect(result.data).toHaveLength(3);
  });
});
