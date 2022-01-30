import "@babel/polyfill";

import { TypeSafeWeb3 } from "../lib/index";

const sut = new TypeSafeWeb3();

describe("get block by hash", () => {
  it("should return a block when given a hash", async () => {
    const result = await sut.getBlockByHash("0x640fa41851368922cc0c1ccf9d040081ba098ac2208c2d78ac090ba4e101854e");

    expect(result.data?.transactions).toHaveLength(2);
  });
});
