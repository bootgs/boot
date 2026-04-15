import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { ResponseEntity } from "src/domain/entities/ResponseEntity";
import { ContentMimeType, HttpStatus, RequestMethod } from "src/domain/enums";
import { Router } from "src/service/Router";
import { Resolver } from "src/service/Resolver";
import { HttpRequest } from "src/domain/types";

describe("ResponseEntity and Router Integration", () => {
  it("should build ResponseEntity correctly", () => {
    const response = ResponseEntity.status(HttpStatus.CREATED)
      .header("X-Test", "value")
      .contentType(ContentMimeType.JSON)
      .body({ foo: "bar" });

    expect(response.getStatusCode()).toBe(HttpStatus.CREATED);
    expect(response.getHeaders()).toEqual({ "X-Test": "value" });
    expect(response.getProduces()).toBe(ContentMimeType.JSON);
    expect(response.getBody()).toEqual({ foo: "bar" });
  });

  it("should be handled by Router", async () => {
    const mockResponseBuilder = vi
      .fn()
      .mockImplementation((req, status, headers, data, produce) => ({
        status,
        headers,
        body: data,
        produce
      }));

    const route: any = {
      controller: class {},
      handler: "test",
      method: RequestMethod.GET,
      path: "/test"
    };

    const resolver = {
      resolve: vi.fn().mockReturnValue({
        test: () => ResponseEntity.ok({ message: "hello" })
      })
    } as unknown as Resolver;

    const router = new Router(resolver, [route]);
    const request = {
      method: RequestMethod.GET,
      url: { pathname: "/test" },
      headers: {}
    } as unknown as HttpRequest;

    const result = await router.handle(request, {} as any, mockResponseBuilder);

    expect(result.status).toBe(HttpStatus.OK);
    expect(result.body).toEqual({ message: "hello" });
  });

  it("should use ResponseEntity status and headers in Router", async () => {
    const mockResponseBuilder = vi
      .fn()
      .mockImplementation((req, status, headers, data, produce) => ({
        status,
        headers,
        body: data,
        produce
      }));

    const route: any = {
      controller: class {},
      handler: "test",
      method: RequestMethod.GET,
      path: "/test"
    };

    const resolver = {
      resolve: vi.fn().mockReturnValue({
        test: () =>
          ResponseEntity.status(HttpStatus.CREATED).header("Custom-Header", "Value").body("created")
      })
    } as unknown as Resolver;

    const router = new Router(resolver, [route]);
    const request = {
      method: RequestMethod.GET,
      url: { pathname: "/test" },
      headers: {}
    } as unknown as HttpRequest;

    const result = await router.handle(request, {} as any, mockResponseBuilder);

    expect(result.status).toBe(HttpStatus.CREATED);
    expect(result.headers).toEqual({ "Custom-Header": "Value" });
    expect(result.body).toBe("created");
  });
});
