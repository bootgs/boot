import { describe, expect, it, vi } from "vitest";
import { RequestFactory } from "src/service";
import { RequestMethod } from "src/domain/enums";

describe("RequestFactory: Negative", () => {
  const factory = new RequestFactory();

  it("should handle invalid JSON headers gracefully", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const event = {
      parameter: {
        headers: "{ invalid json"
      }
    } as unknown as GoogleAppsScript.Events.DoGet;
    const req = factory.create(RequestMethod.GET, event);
    expect(req.headers).toEqual({});
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("should handle invalid JSON body gracefully", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const event = {
      postData: {
        type: "application/json",
        contents: "{ invalid body"
      },
      parameter: {
        headers: JSON.stringify({ "Content-Type": "application/json" })
      }
    } as unknown as GoogleAppsScript.Events.DoPost;
    const req = factory.create(RequestMethod.POST, event);
    expect(req.body).toBe("{ invalid body");
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
