import { describe, expect, it } from "vitest";
import { HttpException } from "src/exceptions";

describe("HttpException: Positive", () => {
  it("should create an exception with message and status", () => {
    const msg = "Not Found";
    const status = 404;
    const ex = new HttpException(msg, status);

    expect(ex.message).toBe(msg);
    expect(ex.status).toBe(status);
    expect(ex.name).toBe("HttpException");
  });
});
