import { describe, expect, it } from "vitest";
import { PathMatcher } from "src/service";

describe("PathMatcher: Positive", () => {
  const matcher = new PathMatcher();

  describe("match", () => {
    it("should match simple paths", () => {
      expect(matcher.match("/users", "/users")).toBe(true);
      expect(matcher.match("/", "/")).toBe(true);
    });

    it("should match paths with parameters", () => {
      expect(matcher.match("/users/{id}", "/users/123")).toBe(true);
      expect(matcher.match("/users/{id}/posts/{postId}", "/users/1/posts/2")).toBe(true);
    });
  });

  describe("extractParams", () => {
    it("should extract simple parameters", () => {
      expect(matcher.extractParams("/users/{id}", "/users/123")).toEqual({ id: "123" });
    });

    it("should extract multiple parameters", () => {
      expect(matcher.extractParams("/users/{id}/posts/{postId}", "/users/1/posts/2")).toEqual({
        id: "1",
        postId: "2"
      });
    });

    it("should return empty object if no parameters in template", () => {
      expect(matcher.extractParams("/users", "/users")).toEqual({});
    });
  });
});
