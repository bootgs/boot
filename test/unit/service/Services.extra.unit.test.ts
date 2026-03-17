import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { RequestFactory, RouterExplorer } from "src/service";
import { Get } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";
import { HttpController } from "src/controller/decorators";

describe("Services: Extra Coverage (RequestFactory & RouterExplorer)", () => {
  describe("RequestFactory", () => {
    it("should fallback to postData.type if Content-Type header is missing", () => {
      const factory = new RequestFactory();
      const event = {
        parameter: {},
        postData: {
          contents: JSON.stringify({ foo: "bar" }),
          type: "application/json"
        }
      } as unknown;

      const request = factory.create(
        RequestMethod.POST,
        event as unknown as GoogleAppsScript.Events.DoPost
      );
      expect(request.body).toEqual({ foo: "bar" });
    });
  });

  describe("RouterExplorer", () => {
    it("should use default basePath and handle methods without metadata", () => {
      @HttpController() // No path provided, should default to "/"
      class TestController {
        methodWithoutDecorator() {}

        @Get("/test")
        testMethod() {}
      }

      const explorer = new RouterExplorer();
      const routes = explorer.explore(new Map([ [ TestController, null ] ]));

      expect(routes.length).toBe(1);
      expect(routes[ 0 ].path).toBe("/test");
    });
  });
});
