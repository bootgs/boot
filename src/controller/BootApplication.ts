import { isString } from "apps-script-utils";
import { ApplicationConfig, AppsScriptMenuProxy, InjectionToken, Newable } from "../domain/types";
import { AppsScriptEventType, RequestMethod } from "../domain/enums";
import {
  EventDispatcher,
  RequestFactory,
  Resolver,
  ResponseBuilder,
  Router,
  RouterExplorer
} from "../service";

/**
 * Main application class for bootstrapping and handling Google Apps Script events.
 */
export class BootApplication {
  private readonly _controllers = new Map<Newable, unknown>();
  private readonly _providers = new Map<InjectionToken, unknown>();
  private readonly _resolver: Resolver;
  private readonly _router: Router;
  private readonly _requestFactory = new RequestFactory();
  private readonly _responseBuilder = new ResponseBuilder();
  private readonly _eventDispatcher: EventDispatcher;

  /**
   * Creates a new instance of BootApplication.
   *
   * @param {ApplicationConfig} config The application configuration.
   */
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

  /**
   * Handles Google Apps Script doGet events.
   *
   * @param {GoogleAppsScript.Events.DoGet} event The doGet event object.
   * @returns {Promise<GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput>} The response object.
   */
  public async doGet(event: GoogleAppsScript.Events.DoGet) {
    return this.handleHttpRequest(RequestMethod.GET, event);
  }

  /**
   * Handles Google Apps Script doPost events.
   *
   * @param {GoogleAppsScript.Events.DoPost} event The doPost event object.
   * @returns {Promise<GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput>} The response object.
   */
  public async doPost(event: GoogleAppsScript.Events.DoPost) {
    return this.handleHttpRequest(RequestMethod.POST, event);
  }

  /**
   * Handles Google Apps Script onInstall events.
   *
   * @param {GoogleAppsScript.Events.AddonOnInstall} event The onInstall event object.
   * @returns {Promise<void>}
   */
  public async onInstall(event: GoogleAppsScript.Events.AddonOnInstall) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.INSTALL, event);
  }

  /**
   * Handles Google Apps Script onOpen events.
   *
   * @param {GoogleAppsScript.Events.AppsScriptEvent} event The onOpen event object.
   * @returns {Promise<void>}
   */
  public async onOpen(event: GoogleAppsScript.Events.AppsScriptEvent) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.OPEN, event);
  }

  /**
   * Handles Google Apps Script onEdit events.
   *
   * @param {GoogleAppsScript.Events.SheetsOnEdit} event The onEdit event object.
   * @returns {Promise<void>}
   */
  public async onEdit(event: GoogleAppsScript.Events.SheetsOnEdit) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.EDIT, event);
  }

  /**
   * Handles Google Apps Script onChange events.
   *
   * @param {GoogleAppsScript.Events.SheetsOnChange} event The onChange event object.
   * @returns {Promise<void>}
   */
  public async onChange(event: GoogleAppsScript.Events.SheetsOnChange) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.CHANGE, event);
  }

  // TODO: onSelectionChange
  // public async onSelectionChange(event: GoogleAppsScript.Events.SheetsOnSelectionChange) {
  //   await this.eventDispatcher.dispatch(AppsScriptEventType.SELECTION_CHANGE, event);
  // }

  /**
   * Handles Google Apps Script onFormSubmit events.
   *
   * @param {GoogleAppsScript.Events.FormsOnFormSubmit} event The onFormSubmit event object.
   * @returns {Promise<void>}
   */
  public async onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit) {
    await this._eventDispatcher.dispatch(AppsScriptEventType.FORM_SUBMIT, event);
  }

  /**
   * Returns a Proxy object that can be used to handle Google Apps Script menu actions.
   *
   * @returns {AppsScriptMenuProxy} A Proxy object.
   */
  public onMenu(): AppsScriptMenuProxy {
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (!isString(prop)) {
          return Reflect.get(target, prop, receiver);
        }

        if (prop === "inspect") {
          return Reflect.get(target, prop, receiver);
        }

        return (event: GoogleAppsScript.Events.AppsScriptEvent) => {
          return target._eventDispatcher.dispatchByName(prop, event);
        };
      }
    }) as unknown as AppsScriptMenuProxy;
  }

  /**
   * Handles incoming HTTP requests and routes them to the appropriate controller.
   *
   * @param {RequestMethod} method The HTTP method (GET or POST).
   * @param {GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost} event The Apps Script event object.
   * @returns {Promise<GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput>} The response object.
   */
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
