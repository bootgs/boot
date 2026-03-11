import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { BootApplicationFactory } from "src/controller";
import { Resolver } from "src/service";
import { HttpController, Inject } from "src/controller/decorators";

const STRING_TOKEN = "STRING_TOKEN";

@HttpController()
class StringTokenController {
  constructor(@Inject(STRING_TOKEN) public value: string) {}
}

describe("Inject Decorator: Boundary", () => {
  it("should correctly inject dependency using a string token", () => {
    const app = BootApplicationFactory.create({
      controllers: [StringTokenController],
      providers: [{ provide: STRING_TOKEN, useValue: "token_value" }]
    });

    const instance = (app as unknown as { _resolver: Resolver })._resolver.resolve(
      StringTokenController
    );
    expect(instance.value).toBe("token_value");
  });
});
