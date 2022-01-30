import "@babel/polyfill";

import { TypeSafeWeb3 } from "../lib/index";

const sut = new TypeSafeWeb3();

describe("get block by number", () => {
  it("should get block by number", async () => {
    const result = await sut.getBlockByNumber(1661071, true);
    // print(result);
    expect(result.data?.transactions).toHaveLength(2);
  });

  it("should get `latest` block", async () => {
    const result = await sut.getBlockByNumber("latest");
    expect(result.data?.number).toBeGreaterThan(6355298);
  });
});
