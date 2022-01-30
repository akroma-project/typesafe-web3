import { Result } from "../lib/model/result";

describe("success result", () => {
  it("should set ok as true", () => {
    const result = Result.success<string>("data");
    expect(result.ok).toBeTruthy();
  });
  it("should return data", () => {
    const result = Result.success<string>("data");
    expect(result.data).toBe("data");
  });
});
