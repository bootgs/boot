import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { RouterExplorer } from "src/service";
import { HttpController } from "src/controller/decorators";
import { Newable } from "src/domain/types";

describe("RouterExplorer: Negative", () => {
  const explorer = new RouterExplorer();

  it("should ignore controllers that are not 'http' type", () => {
    @HttpController("other")
    class OtherController {
      test() {}
    }

    const controllers = new Map<Newable, unknown>();
    controllers.set(OtherController, null);

    const routes = explorer.explore(controllers);
    expect(routes).toHaveLength(0);
  });
});
