import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { RouterExplorer } from "src/service";
import { Get, Post } from "src/controller/decorators/routing";
import { HttpController } from "src/controller/decorators";
import { RequestMethod } from "src/domain/enums";
import { Newable } from "src/domain/types";

describe("RouterExplorer: Positive", () => {
  const explorer = new RouterExplorer();

  it("should explore routes from an HttpController", () => {
    @HttpController("/users")
    class UserController {
      @Get()
      findAll() {}

      @Post("/{id}")
      create() {}
    }

    const controllers = new Map<Newable, unknown>();
    controllers.set(UserController, null);

    const routes = explorer.explore(controllers);

    expect(routes).toHaveLength(2);
    expect(routes).toContainEqual(
      expect.objectContaining({
        path: "/users",
        method: RequestMethod.GET,
        handler: "findAll"
      })
    );
    expect(routes).toContainEqual(
      expect.objectContaining({
        path: "/users/{id}",
        method: RequestMethod.POST,
        handler: "create"
      })
    );
  });
});
