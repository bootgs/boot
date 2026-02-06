import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { MetadataRepository } from "src/repository";

describe("MetadataRepository: Extra", () => {
  let repository: MetadataRepository;

  beforeEach(() => {
    repository = new MetadataRepository();
  });

  it("should define and get metadata for a property", () => {
    const target = { prop: "value" };
    repository.defineMetadata("key", "meta-value", target, "prop");

    expect(repository.getMetadata("key", target, "prop")).toBe("meta-value");
    expect(repository.hasMetadata("key", target, "prop")).toBe(true);
  });

  it("should get own metadata keys for a property", () => {
    const target = { prop: "value" };
    repository.defineMetadata("key1", "val1", target, "prop");
    repository.defineMetadata("key2", "val2", target, "prop");

    const keys = repository.getOwnMetadataKeys(target, "prop");
    expect(keys).toContain("key1");
    expect(keys).toContain("key2");
  });
});
