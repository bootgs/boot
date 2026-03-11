import "reflect-metadata";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Resolver, Router } from "src/service";
import { HttpStatus, RequestMethod } from "src/domain/enums";
import {
  Body,
  Event,
  Headers,
  Param,
  Query,
  Request,
  Response
} from "src/controller/decorators/params";
import { Get } from "src/controller/decorators/routing";
import { Inject } from "src/controller/decorators";
import { HttpHeaders, HttpRequest, HttpResponse, RouteMetadata } from "src/domain/types";

describe("Router: Extra", () => {
  let resolver: Resolver;
  let router: Router;

  beforeEach(() => {
    resolver = {
      resolve: vi.fn()
    } as unknown as Resolver;
  });

  it("should return HttpResponse directly if returned from handler", async () => {
    class TestController {
      @Get("/")
      handle() {
        return { status: 201, body: { done: true }, headers: {}, ok: true, statusText: "Created" };
      }
    }
    const routes: RouteMetadata[] = [
      { controller: TestController, handler: "handle", method: RequestMethod.GET, path: "/" }
    ];
    router = new Router(resolver, routes);
    vi.mocked(resolver.resolve).mockReturnValue(new TestController());

    const request = { method: RequestMethod.GET, url: { pathname: "/" } } as unknown as HttpRequest;
    const resBuilder = vi
      .fn()
      .mockImplementation((_req, status, _headers, data) => ({ status, body: data }));

    const result = await router.handle(
      request,
      {} as unknown as GoogleAppsScript.Events.DoGet,
      resBuilder as unknown as (
        request: HttpRequest,
        status?: HttpStatus,
        headers?: HttpHeaders,
        data?: unknown
      ) => HttpResponse
    );
    expect(result.status).toBe(201);
    expect((result as unknown as HttpResponse).body).toEqual({ done: true });
    expect(resBuilder).toHaveBeenCalledTimes(1);
  });

  it("should inject various parameter types (with and without keys)", async () => {
    class Service {}
    const serviceInstance = new Service();
    class TestController {
      @Get("/")
      handle(
        @Headers() h: unknown,
        @Headers("X-Custom") custom: string,
        @Event() e: unknown,
        @Event("foo") eFoo: string,
        @Request() req: unknown,
        @Request("method") reqMethod: string,
        @Response() res: unknown,
        @Response("status") resStatus: number,
        @Inject(Service) s: Service,
        @Param() p: unknown,
        @Param("id") pId: string,
        @Query() q: unknown,
        @Query("name") qName: string,
        @Body() b: unknown,
        @Body("user") bUser: string
      ) {
        return {
          h,
          custom,
          e,
          eFoo,
          req,
          reqMethod,
          res,
          resStatus,
          s,
          p,
          pId,
          q,
          qName,
          b,
          bUser
        };
      }
    }

    vi.mocked(resolver.resolve).mockImplementation((target: unknown) => {
      if (target === TestController) return new TestController();
      if (target === Service) return serviceInstance;
      return null;
    });

    const routes: RouteMetadata[] = [
      { controller: TestController, handler: "handle", method: RequestMethod.GET, path: "/{id}" }
    ];
    router = new Router(resolver, routes);

    const mockEvent = { foo: "bar" };
    const request = {
      method: RequestMethod.GET,
      url: { pathname: "/123", query: { name: "val" } },
      headers: { "x-custom": "value" },
      body: { user: "john" }
    } as unknown as HttpRequest;

    const resBuilder = vi
      .fn()
      .mockImplementation((_req, status, headers, data) => ({ status, headers, body: data }));

    const response = await router.handle(
      request,
      mockEvent as unknown as GoogleAppsScript.Events.DoGet,
      resBuilder as unknown as (
        request: HttpRequest,
        status?: HttpStatus,
        headers?: HttpHeaders,
        data?: unknown
      ) => HttpResponse
    );
    const result = response.body as Record<string, unknown>;

    expect(result.h).toEqual(request.headers);
    expect(result.custom).toBe("value");
    expect(result.e).toEqual(mockEvent);
    expect(result.eFoo).toBe("bar");
    expect(result.req).toEqual(request);
    expect(result.reqMethod).toBe(RequestMethod.GET);
    expect(result.res).toBeDefined();
    expect(result.s).toBe(serviceInstance);
    expect(result.p).toEqual({ id: "123" });
    expect(result.pId).toBe("123");
    expect(result.q).toEqual({ name: "val" });
    expect(result.qName).toBe("val");
    expect(result.b).toEqual({ user: "john" });
    expect(result.bUser).toBe("john");
  });

  it("should handle missing token in @Inject", async () => {
    class TestController {
      @Get("/")
      handle(@Inject(undefined as unknown as string) s: unknown) {
        return s;
      }
    }
    const routes: RouteMetadata[] = [
      { controller: TestController, handler: "handle", method: RequestMethod.GET, path: "/" }
    ];
    router = new Router(resolver, routes);
    vi.mocked(resolver.resolve).mockReturnValue(new TestController());
    const request = { method: RequestMethod.GET, url: { pathname: "/" } } as unknown as HttpRequest;
    const resBuilder = vi
      .fn()
      .mockImplementation((_req, status, _headers, data) => ({ status, body: data }));

    const response = await router.handle(
      request,
      {} as unknown as GoogleAppsScript.Events.DoGet,
      resBuilder as unknown as (
        request: HttpRequest,
        status?: HttpStatus,
        headers?: HttpHeaders,
        data?: unknown
      ) => HttpResponse
    );
    expect(response.body).toBeUndefined();
  });

  it("should handle injection failure in router", async () => {
    class TestController {
      @Get("/")
      handle(@Inject("UNKNOWN") s: unknown) {
        return s;
      }
    }
    vi.mocked(resolver.resolve).mockImplementation((target: unknown) => {
      if (target === TestController) return new TestController();
      throw new Error("Resolve failed");
    });
    const routes: RouteMetadata[] = [
      { controller: TestController, handler: "handle", method: RequestMethod.GET, path: "/" }
    ];
    router = new Router(resolver, routes);
    const request = { method: RequestMethod.GET, url: { pathname: "/" } } as unknown as HttpRequest;
    const resBuilder = vi
      .fn()
      .mockImplementation((_req, status, _headers, data) => ({ status, body: data }));

    const response = await router.handle(
      request,
      {} as unknown as GoogleAppsScript.Events.DoGet,
      resBuilder as unknown as (
        request: HttpRequest,
        status?: HttpStatus,
        headers?: HttpHeaders,
        data?: unknown
      ) => HttpResponse
    );
    expect(response.body).toBeUndefined();
  });
});
