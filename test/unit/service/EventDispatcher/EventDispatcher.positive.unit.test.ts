import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { BootApplication, BootApplicationFactory } from "src/controller";
import { Event } from "src/controller/decorators/params";
import { OnChange, OnEdit, OnOpen } from "src/controller/decorators/appsscript";

class TestEventController {
  public onOpenCalled = false;
  public eventData: unknown = null;
  public onEditCalled = false;
  public onChangeCalled = false;

  @OnOpen()
  handleOpen(@Event() e: unknown) {
    this.onOpenCalled = true;
    this.eventData = e;
  }

  @OnEdit({ range: "A1" })
  handleEditA1() {
    this.onEditCalled = true;
  }

  @OnChange({ changeType: "INSERT_ROW" })
  handleChangeRow() {
    this.onChangeCalled = true;
  }
}

describe("EventDispatcher: Positive", () => {
  let controller: TestEventController;
  let app: BootApplication;

  beforeEach(() => {
    controller = new TestEventController();
    app = BootApplicationFactory.create({
      controllers: [TestEventController],
      providers: [{ provide: TestEventController, useValue: controller }]
    });
  });

  it("should dispatch OnOpen event", () => {
    const mockEvent = { authMode: "LIMITED" } as unknown as GoogleAppsScript.Events.AppsScriptEvent;
    app.onOpen(mockEvent);

    expect(controller.onOpenCalled).toBe(true);
    expect(controller.eventData).toEqual(mockEvent);
  });

  it("should dispatch OnEdit event when range matches", () => {
    const mockEvent = {
      range: {
        getA1Notation: () => "A1"
      }
    } as unknown as GoogleAppsScript.Events.SheetsOnEdit;
    app.onEdit(mockEvent);
    expect(controller.onEditCalled).toBe(true);
  });

  it("should dispatch OnChange event when changeType matches", () => {
    const mockEvent = {
      changeType: "INSERT_ROW"
    } as unknown as GoogleAppsScript.Events.SheetsOnChange;
    app.onChange(mockEvent);
    expect(controller.onChangeCalled).toBe(true);
  });
});
