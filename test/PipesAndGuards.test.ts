import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { HttpController } from "../src/controller/decorators";
import { Get } from "../src/controller/decorators/routing";
import { Query } from "../src/controller/decorators/params";
import { ParseIntPipe } from "../src/controller/decorators/params/pipes";
import { UsePipes } from "../src/controller/decorators/validation";
import { Router } from "../src/service/Router";
import { Resolver } from "../src/service/Resolver";
import { RequestMethod } from "../src/domain/enums";
import { HttpRequest } from "../src/domain/types";

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
