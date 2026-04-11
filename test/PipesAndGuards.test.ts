import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { HttpController } from "../src/controller/decorators";
import { Get } from "../src/controller/decorators/routing";
import { Query } from "../src/controller/decorators/params";
import { ParseIntPipe } from "../src/controller/decorators/params/pipes";
import { UseGuards } from "../src/controller/decorators/security";
import { UsePipes } from "../src/controller/decorators/validation";
import { Router } from "../src/service/Router";
import { Resolver } from "../src/service/Resolver";
import { RequestMethod } from "../src/domain/enums";
import { CanActivate, ExecutionContext, HttpRequest } from "../src/domain/types";

describe("Pipes and Guards", () => {
  it("should transform query parameter with ParseIntPipe", () => {
    @HttpController("/test")
    class TestController {
      @Get("sum")
      getSum(@Query("a", ParseIntPipe) a: number, @Query("b", ParseIntPipe) b: number) {
        return a + b;
      }
    }

    const controllers = new Map<any, any>([ [ TestController, null ] ]);
    const providers = new Map<any, any>();
    const resolver = new Resolver(controllers, providers);
    const routes = [
      {
        controller: TestController,
        handler: "getSum",
        method: RequestMethod.GET,
        path: "/test/sum"
      }
    ];
    const router = new Router(resolver, routes);

    const request: HttpRequest = {
      method: RequestMethod.GET,
      url: {
        pathname: "/test/sum",
        path: "/test/sum?a=10&b=20",
        query: { a: "10", b: "20" }
      },
      headers: {},
      body: null
    };

    const responseBuilder = vi.fn((req, status, headers, data) => ({
      status: status || 200,
      headers: headers || {},
      body: data
    }));

    const result = router.handle(request, {} as any, responseBuilder as any);

    expect(result.body).toBe(30);
  });

  it("should block request if guard returns false", () => {
    class AuthGuard implements CanActivate {
      canActivate(context: ExecutionContext): boolean {
        return false;
      }
    }

    @HttpController("/secure")
    @UseGuards(AuthGuard)
    class SecureController {
      @Get("data")
      getData() {
        return "secret data";
      }
    }

    const controllers = new Map<any, any>([ [ SecureController, null ] ]);
    const providers = new Map<any, any>([ [ AuthGuard, new AuthGuard() ] ]);
    const resolver = new Resolver(controllers, providers);
    const routes = [
      {
        controller: SecureController,
        handler: "getData",
        method: RequestMethod.GET,
        path: "/secure/data"
      }
    ];
    const router = new Router(resolver, routes);

    const request: HttpRequest = {
      method: RequestMethod.GET,
      url: { pathname: "/secure/data", path: "/secure/data", query: {} },
      headers: {},
      body: null
    };

    const responseBuilder = vi.fn((req, status, headers, data) => ({
      status: status || 200,
      headers: headers || {},
      body: data
    }));

    const result = router.handle(request, {} as any, responseBuilder as any);

    expect(result.status).toBe(403);
    expect(result.body).toEqual({ message: "Forbidden resource" });
  });

  it("should allow request if guard returns true", () => {
    class AlwaysTrueGuard implements CanActivate {
      canActivate(): boolean {
        return true;
      }
    }

    @HttpController("/public")
    class PublicController {
      @Get("info")
      @UseGuards(AlwaysTrueGuard)
      getInfo() {
        return "public info";
      }
    }

    const controllers = new Map<any, any>([ [ PublicController, null ] ]);
    const providers = new Map<any, any>([ [ AlwaysTrueGuard, new AlwaysTrueGuard() ] ]);
    const resolver = new Resolver(controllers, providers);
    const routes = [
      {
        controller: PublicController,
        handler: "getInfo",
        method: RequestMethod.GET,
        path: "/public/info"
      }
    ];
    const router = new Router(resolver, routes);

    const request: HttpRequest = {
      method: RequestMethod.GET,
      url: { pathname: "/public/info", path: "/public/info", query: {} },
      headers: {},
      body: null
    };

    const responseBuilder = vi.fn((req, status, headers, data) => ({
      status: status || 200,
      headers: headers || {},
      body: data
    }));

    const result = router.handle(request, {} as any, responseBuilder as any);

    expect(result.status).toBe(200);
    expect(result.body).toBe("public info");
  });

  it("should apply method-level pipes with UsePipes", () => {
    const CustomPipe = (value: any) => `prefix_${value}`;

    @HttpController("/pipes")
    class PipeController {
      @Get("echo")
      @UsePipes(CustomPipe)
      echo(@Query("msg") msg: string) {
        return msg;
      }
    }

    const controllers = new Map<any, any>([ [ PipeController, null ] ]);
    const resolver = new Resolver(controllers, new Map());
    const routes = [
      {
        controller: PipeController,
        handler: "echo",
        method: RequestMethod.GET,
        path: "/pipes/echo"
      }
    ];
    const router = new Router(resolver, routes);

    const request: HttpRequest = {
      method: RequestMethod.GET,
      url: { pathname: "/pipes/echo", path: "/pipes/echo?msg=hello", query: { msg: "hello" } },
      headers: {},
      body: null
    };

    const responseBuilder = vi.fn((req, status, headers, data) => ({
      status: status || 200,
      headers: headers || {},
      body: data
    }));

    const result = router.handle(request, {} as any, responseBuilder as any);

    expect(result.body).toBe("prefix_hello");
  });
});
