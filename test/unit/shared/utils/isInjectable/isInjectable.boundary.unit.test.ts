import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { isInjectable } from "src/shared/utils";
import { Newable } from "src/domain/types";

describe("isInjectable: Boundary", () => {
  it("should handle null/undefined", () => {
    expect(() => isInjectable(null as unknown as Newable)).toThrow();
  });
});
