import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { Resolver, Router } from "src/service";
import { HttpStatus, RequestMethod } from "src/domain/enums";
import { Get } from "src/controller/decorators/routing";
import { Param } from "src/controller/decorators/params";
import { HttpController } from "src/controller/decorators";
import { HttpHeaders, HttpRequest, HttpResponse, RouteMetadata } from "src/domain/types";

describe("Router: Positive", () => {
  it("should find and call the correct route handler", async () => {
    @HttpController("/users")
    class UserController {
      @Get("/{id}")
      findOne(@Param("id") id: string) {
        return { id, name: "User " + id };
      }
    }

    const controllerInstance = new UserController();
    const mockResolver = {
      resolve: vi.fn().mockReturnValue(controllerInstance)
    } as unknown as Resolver;

    const routes: RouteMetadata[] = [
      {
        controller: UserController,
        handler: "findOne",
        method: RequestMethod.GET,
        path: "/users/{id}"
      }
    ];

    const router = new Router(mockResolver, routes);

    const mockRequest = {
      method: RequestMethod.GET,
      url: { pathname: "/users/123", query: {} },
      headers: {}
    } as unknown as HttpRequest;

    const responseBuilder = vi.fn().mockImplementation((_req, status, headers, data) => ({
      status: status || 200,
      headers,
      body: data
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

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: "123", name: "User 123" });
    expect(mockResolver.resolve).toHaveBeenCalledWith(UserController);
  });
});
