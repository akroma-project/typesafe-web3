import "@babel/polyfill";

import { TypeSafeWeb3 } from "../lib/index";
import { Utils } from "../lib/utils";
const u = new Utils();
const sut = new TypeSafeWeb3();

describe("get balance", () => {
  it("should get balance for address", async () => {
    const result = await sut.getBalance("0xd568ba7c2239ce5c93d500c975f0e341a6fb5326");
    const value = u.fromWei(result.data ?? "", "ether");
    expect(value).toBe("2030.0313919397");
  });
});
