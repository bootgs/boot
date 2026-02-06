import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { BootApplication, BootApplicationFactory } from "src/controller";
import { OnEdit } from "src/controller/decorators/appsscript";

class TestEventController {
  public onEditCalled = false;

  @OnEdit({ range: "A1" })
  handleEditA1() {
    this.onEditCalled = true;
  }
}

describe("EventDispatcher: Boundary", () => {
  let controller: TestEventController;
  let app: BootApplication;

  beforeEach(() => {
    controller = new TestEventController();
    app = BootApplicationFactory.create({
      controllers: [ TestEventController ],
      providers: [ { provide: TestEventController, useValue: controller } ]
    });
  });

  it("should not throw error and not dispatch when event range is missing", async () => {
    const mockEvent = {} as unknown as GoogleAppsScript.Events.SheetsOnEdit;
    await expect(app.onEdit(mockEvent)).resolves.toBeUndefined();
    expect(controller.onEditCalled).toBe(false);
  });
});
