import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { BootApplication, BootApplicationFactory } from "src/controller";
import { OnChange, OnEdit } from "src/controller/decorators/appsscript";

class TestEventController {
  public onEditCalled = false;
  public onChangeCalled = false;

  @OnEdit({ range: "A1" })
  handleEditA1() {
    this.onEditCalled = true;
  }

  @OnChange({ changeType: "INSERT_ROW" })
  handleChangeRow() {
    this.onChangeCalled = true;
  }
}

describe("EventDispatcher: Negative", () => {
  let controller: TestEventController;
  let app: BootApplication;

  beforeEach(() => {
    controller = new TestEventController();
    app = BootApplicationFactory.create({
      controllers: [ TestEventController ],
      providers: [ { provide: TestEventController, useValue: controller } ]
    });
  });

  it("should not dispatch OnEdit event when range does not match", async () => {
    const mockEvent = {
      range: {
        getA1Notation: () => "B2"
      }
    } as unknown as GoogleAppsScript.Events.SheetsOnEdit;
    await app.onEdit(mockEvent);
    expect(controller.onEditCalled).toBe(false);
  });

  it("should not dispatch OnChange event when changeType does not match", async () => {
    const mockEvent = {
      changeType: "REMOVE_ROW"
    } as unknown as GoogleAppsScript.Events.SheetsOnChange;
    await app.onChange(mockEvent);
    expect(controller.onChangeCalled).toBe(false);
  });
});
