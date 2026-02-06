import { describe, expect, it } from "vitest";
import { PathMatcher } from "src/service";

describe("PathMatcher: Boundary", () => {
  const matcher = new PathMatcher();

  it("should handle empty strings", () => {
    expect(matcher.match("", "")).toBe(true);
    expect(matcher.extractParams("", "")).toEqual({});
  });

  it("should handle multiple slashes (splitting by / filters empty parts)", () => {
    expect(matcher.match("//users//", "/users")).toBe(true);
  });

  it("should handle paths with special characters in params", () => {
    expect(matcher.extractParams("/users/{id}", "/users/user@domain.com")).toEqual({
      id: "user@domain.com"
    });
  });
});
