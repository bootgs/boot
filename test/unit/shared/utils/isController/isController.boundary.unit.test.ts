import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { isController } from "src/shared/utils";
import { Newable } from "src/domain/types";

describe("isController: Boundary", () => {
  it("should handle null/undefined", () => {
    expect(() => isController(null as unknown as Newable)).toThrow();
  });
});
