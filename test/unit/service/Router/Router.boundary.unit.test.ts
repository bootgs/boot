import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { Resolver, Router } from "src/service";
import { HttpStatus, RequestMethod } from "src/domain/enums";
import { HttpHeaders, HttpRequest, HttpResponse, RouteMetadata } from "src/domain/types";

describe("Router: Boundary", () => {
  it("should handle routes with same path but different methods", async () => {
    class TestController {
      get() {
        return "get";
      }
      post() {
        return "post";
      }
    }
    const instance = new TestController();
    const mockResolver = { resolve: vi.fn().mockReturnValue(instance) } as unknown as Resolver;
    const routes: RouteMetadata[] = [
      { controller: TestController, handler: "get", method: RequestMethod.GET, path: "/test" },
      { controller: TestController, handler: "post", method: RequestMethod.POST, path: "/test" }
    ];
    const router = new Router(mockResolver, routes);
    const responseBuilder = vi.fn().mockImplementation((_req, status, headers, data) => ({
      status: status || HttpStatus.OK,
      headers: headers || {},
      body: data,
      ok: (status || HttpStatus.OK) < 400,
      statusText: "OK"
    }));

    const res1 = await router.handle(
      { method: RequestMethod.GET, url: { pathname: "/test" } } as unknown as HttpRequest,
      {} as unknown as GoogleAppsScript.Events.DoGet,
      responseBuilder as unknown as (
        request: HttpRequest,
        status?: HttpStatus,
        headers?: HttpHeaders,
        data?: unknown
      ) => HttpResponse
    );
    expect(res1.body).toBe("get");

    const res2 = await router.handle(
      { method: RequestMethod.POST, url: { pathname: "/test" } } as unknown as HttpRequest,
      {} as unknown as GoogleAppsScript.Events.DoPost,
      responseBuilder as unknown as (
        request: HttpRequest,
        status?: HttpStatus,
        headers?: HttpHeaders,
        data?: unknown
      ) => HttpResponse
    );
    expect(res2.body).toBe("post");
  });
});
