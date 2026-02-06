import { describe, expect, it } from "vitest";
import { BootApplicationFactory } from "src/controller";
import { BootApplication } from "src/controller";

describe("BootApplicationFactory: Positive", () => {
  it("should create a BootApplication instance", () => {
    const app = BootApplicationFactory.create({
      controllers: [],
      providers: []
    });
    expect(app).toBeInstanceOf(BootApplication);
  });
});
