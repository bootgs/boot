import { describe, expect, it } from "vitest";
import { RequestFactory } from "src/service";
import { RequestMethod } from "src/domain/enums";

describe("RequestFactory: Boundary", () => {
  const factory = new RequestFactory();

  it("should handle null/undefined event properties", () => {
    const event = null as unknown as GoogleAppsScript.Events.DoGet;
    const req = factory.create(RequestMethod.GET, event);
    expect(req.url.pathname).toBe("/");
    expect(req.headers).toEqual({});
  });

  it("should handle empty parameter object", () => {
    const event = { parameter: {} } as unknown as GoogleAppsScript.Events.DoGet;
    const req = factory.create(RequestMethod.GET, event);
    expect(req.url.pathname).toBe("/");
  });

  it("should override method from parameter if valid", () => {
    const event = {
      parameter: {
        method: "PUT"
      }
    } as unknown as GoogleAppsScript.Events.DoGet;
    const req = factory.create(RequestMethod.POST, event);
    expect(req.method).toBe(RequestMethod.PUT);
  });
});
