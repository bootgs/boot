import { describe, expect, it } from "vitest";
import { assignInjectMetadata } from "src/repository";
import { ParamSource } from "src/domain/enums";

describe("assignInjectMetadata: Positive", () => {
  it("should correctly update existing inject metadata object", () => {
    const existing = {};
    const updated = assignInjectMetadata(existing, 0, "TOKEN");

    expect(updated).toEqual({
      "INJECT:0": { type: ParamSource.INJECT, token: "TOKEN", index: 0 }
    });
  });
});
