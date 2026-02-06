import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { MetadataRepository } from "src/repository";

describe("MetadataRepository: Positive", () => {
  const repo = new MetadataRepository();

  it("should define and get metadata", () => {
    const target = {};
    const key = "key";
    const val = "value";
    repo.defineMetadata(key, val, target);
    expect(repo.getMetadata(key, target)).toBe(val);
  });

  it("should check if metadata exists", () => {
    const target = {};
    const key = "key";
    repo.defineMetadata(key, "val", target);
    expect(repo.hasMetadata(key, target)).toBe(true);
    expect(repo.hasMetadata("other", target)).toBe(false);
  });
});
