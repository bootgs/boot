import { describe, expect, it } from "vitest";
import { RequestFactory } from "src/service";
import { RequestMethod } from "src/domain/enums";

describe("RequestFactory: Positive", () => {
  const factory = new RequestFactory();

  it("should create a basic GET request", () => {
    const event = {
      parameter: {},
      parameters: {},
      queryString: "",
      pathInfo: "users"
    } as unknown as GoogleAppsScript.Events.DoGet;
    const req = factory.create(RequestMethod.GET, event);

    expect(req.method).toBe(RequestMethod.GET);
    expect(req.url.pathname).toBe("/users");
    expect(req.headers).toEqual({});
  });

  it("should parse JSON headers if provided", () => {
    const headers = { "Content-Type": "application/json", "X-Custom": "value" };
    const event = {
      parameter: {
        headers: JSON.stringify(headers)
      }
    } as unknown as GoogleAppsScript.Events.DoGet;
    const req = factory.create(RequestMethod.GET, event);
    expect(req.headers).toEqual(headers);
  });

  it("should parse JSON body for POST requests", () => {
    const body = { id: 1, name: "Test" };
    const event = {
      postData: {
        type: "application/json",
        contents: JSON.stringify(body)
      },
      parameter: {
        headers: JSON.stringify({ "Content-Type": "application/json" })
      }
    } as unknown as GoogleAppsScript.Events.DoPost;
    const req = factory.create(RequestMethod.POST, event);
    expect(req.body).toEqual(body);
  });
});
