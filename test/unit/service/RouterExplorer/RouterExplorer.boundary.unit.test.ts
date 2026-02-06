import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { RouterExplorer } from "src/service";

describe("RouterExplorer: Boundary", () => {
  const explorer = new RouterExplorer();

  it("should handle empty controllers map", () => {
    const routes = explorer.explore(new Map());
    expect(routes).toHaveLength(0);
  });
});
