import { describe, expect, it } from "vitest";
import { PathMatcher } from "src/service";

describe("PathMatcher: Negative", () => {
  const matcher = new PathMatcher();

  describe("match", () => {
    it("should not match if lengths differ", () => {
      expect(matcher.match("/users", "/users/123")).toBe(false);
      expect(matcher.match("/users/123", "/users")).toBe(false);
    });

    it("should not match if static parts differ", () => {
      expect(matcher.match("/users", "/posts")).toBe(false);
      expect(matcher.match("/users/{id}", "/posts/123")).toBe(false);
    });
  });
});
