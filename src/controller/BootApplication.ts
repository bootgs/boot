import { ApplicationConfig, InjectionToken, Newable } from "../domain/types";
import { AppsScriptEventType, RequestMethod } from "../domain/enums";
import { EventDispatcher, RequestFactory, Resolver, ResponseBuilder, Router, RouterExplorer } from "../service";

export class BootApplication {
  private readonly _controllers = new Map<Newable, unknown>();
  private readonly _providers = new Map<InjectionToken, unknown>();
  private readonly _resolver: Resolver;
  private readonly _router: Router;
  private readonly _requestFactory = new RequestFactory();
  private readonly _responseBuilder = new ResponseBuilder();
  private readonly _eventDispatcher: EventDispatcher;

  constructor(config: ApplicationConfig) {
    (config.controllers || []).forEach((c) => this._controllers.set(c, null));

    (config.providers || []).forEach((p) => {
      if ("provide" in p) {
        if ("useValue" in p) {
          this._providers.set(p.provide, p.useValue);
        } else if ("useClass" in p) {
          this._providers.set(p.provide, null); // Will be resolved later
        } else if ("useFactory" in p) {
          // TODO: implement factory providers
          this._providers.set(p.provide, null);
        } else if ("useExisting" in p) {
          // TODO: implement existing providers
          this._providers.set(p.provide, null);
        }
      } else {
        this._providers.set(p, null);
      }
    });

    this._resolver = new Resolver(this._controllers, this._providers);

    const explorer = new RouterExplorer();

    const routes = explorer.explore(this._controllers);

    this._router = new Router(this._resolver, routes);

    this._eventDispatcher = new EventDispatcher(this._resolver, this._controllers);
  }

  public async doGet(event: GoogleAppsScript.Events.DoGet) {
    return this.handleHttpRequest(RequestMethod.GET, event);
  }

  public async doPost(event: GoogleAppsScript.Events.DoPost) {
    return this.handleHttpRequest(RequestMethod.POST, event);
  }

  public async onInstall(event: GoogleAppsScript.Events.AddonOnInstall) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.INSTALL, event);
  }

  public async onOpen(event: GoogleAppsScript.Events.AppsScriptEvent) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.OPEN, event);
  }

  public async onEdit(event: GoogleAppsScript.Events.SheetsOnEdit) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.EDIT, event);
  }

  public async onChange(event: GoogleAppsScript.Events.SheetsOnChange) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.CHANGE, event);
  }

  // TODO: onSelectionChange
  // public async onSelectionChange(event: GoogleAppsScript.Events.SheetsOnSelectionChange) {
  //   await this.eventDispatcher.dispatch(AppsScriptEventType.SELECTION_CHANGE, event);
  // }

  public async onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.FORM_SUBMIT, event);
  }

  private async handleHttpRequest(
    method: RequestMethod,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost
  ) {
    const request = this._requestFactory.create(method, event);

    const response = await this._router.handle(request, event, (req, status, headers, data) =>
      this._responseBuilder.create(req, status, headers, data)
    );

    return this._responseBuilder.wrap(request, response);
  }
}
