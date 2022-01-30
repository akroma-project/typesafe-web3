import "@babel/polyfill";

import { TypeSafeWeb3 } from "../lib/index";

const sut = new TypeSafeWeb3();

describe("listening", () => {
  it("should return true when listening", async () => {
    const result = await sut.listening();
    expect(result.data).toBeTruthy();
    expect(result.ok).toBeTruthy();
  });
});
