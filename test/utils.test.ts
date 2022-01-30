import "@babel/polyfill";

import { Utils } from "../lib/utils";

const u = new Utils();

describe("Utils", () => {
  it("decode", () => {
    const v = u.toDecimal("0x2e7");
    expect(v).toBe(743);

    const t = u.toDecimal("0x18");
    expect(t).toBe(24);
  });
});
