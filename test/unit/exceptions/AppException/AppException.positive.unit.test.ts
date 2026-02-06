import { describe, expect, it } from "vitest";
import { AppException } from "src/exceptions";

describe("AppException: Positive", () => {
  it("should create an exception with message and status", () => {
    const msg = "Error occurred";
    const status = 400;
    const ex = new AppException(msg, status);

    expect(ex.message).toBe(msg);
    expect(ex.status).toBe(status);
    expect(ex.name).toBe("AppException");
  });

  it("should use default status 500", () => {
    const ex = new AppException("Error");
    expect(ex.status).toBe(500);
  });
});
