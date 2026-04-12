import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { BootApplicationFactory } from "src/controller";

describe("Integration: BootApplication: Boundary", () => {
  const app = BootApplicationFactory.create({
    controllers: []
  });

  (global as unknown as Record<string, unknown>).HtmlService = {
    createHtmlOutput: vi.fn().mockReturnValue({})
  };

  it("should handle empty event without crashing", () => {
    const event = {} as unknown as GoogleAppsScript.Events.DoGet;
    expect(app.doGet(event)).toBeDefined();
  });
});
