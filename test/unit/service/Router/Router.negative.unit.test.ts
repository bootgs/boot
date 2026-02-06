import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { Resolver, Router } from "src/service";
import { HttpStatus, RequestMethod } from "src/domain/enums";
import { HttpHeaders, HttpRequest, HttpResponse, RouteMetadata } from "src/domain/types";

describe("Router: Negative", () => {
  it("should return 404 if no route matches", async () => {
    const mockResolver = { resolve: vi.fn() } as unknown as Resolver;
    const router = new Router(mockResolver, []);

    const mockRequest = {
      method: RequestMethod.GET,
      url: { pathname: "/unknown" }
    } as unknown as HttpRequest;

    const responseBuilder = vi.fn().mockImplementation((_req, status, headers, data) => ({
      status: status || HttpStatus.OK,
      headers: headers || {},
      body: data,
      ok: (status || HttpStatus.OK) < 400,
      statusText: status === 404 ? "Not Found" : "Error"
    }));

    const response = await router.handle(
      mockRequest,
      {} as unknown as GoogleAppsScript.Events.DoGet,
      responseBuilder as unknown as (
        request: HttpRequest,
        status?: HttpStatus,
        headers?: HttpHeaders,
        data?: unknown
      ) => HttpResponse
    );

    expect(response.status).toBe(404);
    expect((response.body as Record<string, unknown>).message).toContain("Cannot get /unknown");
  });

  it("should return 500 if handler throws error", async () => {
    class TestController {
      fail() {
        throw new Error("Boom");
      }
    }
    const controllerInstance = new TestController();
    const mockResolver = {
      resolve: vi.fn().mockReturnValue(controllerInstance)
    } as unknown as Resolver;
    const routes: RouteMetadata[] = [
      {
        controller: TestController,
        handler: "fail",
        method: RequestMethod.GET,
        path: "/fail"
      }
    ];
    const router = new Router(mockResolver, routes);

    const mockRequest = {
      method: RequestMethod.GET,
      url: { pathname: "/fail" }
    } as unknown as HttpRequest;

    const responseBuilder = vi.fn().mockImplementation((_req, status, headers, data) => ({
      status: status || HttpStatus.OK,
      headers: headers || {},
      body: data,
      ok: (status || HttpStatus.OK) < 400,
      statusText: "Error"
    }));

    const response = await router.handle(
      mockRequest,
      {} as unknown as GoogleAppsScript.Events.DoGet,
      responseBuilder as unknown as (
        request: HttpRequest,
        status?: HttpStatus,
        headers?: HttpHeaders,
        data?: unknown
      ) => HttpResponse
    );
    expect(response.status).toBe(500);
    expect(response.body).toBe("Boom");
  });
});
