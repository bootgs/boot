import { isString } from "apps-script-utils";
import { ApplicationConfig, AppsScriptMenuProxy, HttpRequest, HttpResponse } from "../domain/types";
import { AppsScriptEventType, RequestMethod } from "../domain/enums";
import { BaseBootApplication } from "./BaseBootApplication";

/**
 * Synchronous application class for bootstrapping and handling Google Apps Script events.
 */
export class BootApplication extends BaseBootApplication {
  /**
   * Creates a new instance of BootApplication.
   *
   * @param {ApplicationConfig} config - The application configuration.
   */
  public constructor(config?: ApplicationConfig) {
    super(config);
  }

  /**
   * Returns a Proxy object that can be used to handle Google Apps Script menu actions.
   *
   * @returns {AppsScriptMenuProxy} A Proxy object.
   */
  public get onMenu(): AppsScriptMenuProxy {
    const handler: () => AppsScriptMenuProxy = (): AppsScriptMenuProxy => proxy;

    const proxy: AppsScriptMenuProxy = new Proxy(handler, {
      get: (target, prop, receiver: any): any => {
        if (!isString(prop)) {
          return Reflect.get(target, prop, receiver);
        }

        if (prop === "inspect") {
          return Reflect.get(target, prop, receiver);
        }

        if (prop === "apply" || prop === "call" || prop === "bind") {
          return Reflect.get(target, prop, receiver);
        }

        return (event: GoogleAppsScript.Events.AppsScriptEvent): void | Promise<void> => {
          return this._eventDispatcher.dispatchByName(prop, event);
        };
      },
      apply: (target, thisArg: any, argArray): any => {
        return Reflect.apply(target, thisArg, argArray);
      }
    }) as unknown as AppsScriptMenuProxy;

    return proxy;
  }

  /**
   * Handles Google Apps Script doGet events.
   *
   * @param   {GoogleAppsScript.Events.DoGet} event - The doGet event object.
   * @returns {GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string} The response object or string.
   */
  public doGet(
    event: GoogleAppsScript.Events.DoGet
  ): GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string {
    const {
      request,
      response
    }: { request: HttpRequest; response: HttpResponse | Promise<HttpResponse> } =
      this.handleHttpRequestInternal(RequestMethod.GET, event);

    if (response instanceof Promise) {
      return response.then((res: HttpResponse): any =>
        this._responseBuilder.wrap(request, res)
      ) as unknown as any;
    }

    return this._responseBuilder.wrap(request, response);
  }

  /**
   * Handles Google Apps Script doPost events.
   *
   * @param   {GoogleAppsScript.Events.DoPost} event - The doPost event object.
   * @returns {GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string} The response object or string.
   */
  public doPost(
    event: GoogleAppsScript.Events.DoPost
  ): GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string {
    const {
      request,
      response
    }: { request: HttpRequest; response: HttpResponse | Promise<HttpResponse> } =
      this.handleHttpRequestInternal(RequestMethod.POST, event);

    if (response instanceof Promise) {
      return response.then((res: HttpResponse): any =>
        this._responseBuilder.wrap(request, res)
      ) as unknown as any;
    }

    return this._responseBuilder.wrap(request, response);
  }

  /**
   * Handles Google Apps Script onInstall events.
   *
   * @param   {GoogleAppsScript.Events.AddonOnInstall} event - The onInstall event object.
   * @returns {void | Promise<void>}
   */
  public onInstall(event: GoogleAppsScript.Events.AddonOnInstall): void | Promise<void> {
    return this._eventDispatcher.dispatch(AppsScriptEventType.INSTALL, event);
  }

  /**
   * Handles Google Apps Script onOpen events.
   *
   * @param   {GoogleAppsScript.Events.AppsScriptEvent} event - The onOpen event object.
   * @returns {void | Promise<void>}
   */
  public onOpen(event: GoogleAppsScript.Events.AppsScriptEvent): void | Promise<void> {
    return this._eventDispatcher.dispatch(AppsScriptEventType.OPEN, event);
  }

  /**
   * Handles Google Apps Script onEdit events.
   *
   * @param   {GoogleAppsScript.Events.SheetsOnEdit} event - The onEdit event object.
   * @returns {void | Promise<void>}
   */
  public onEdit(event: GoogleAppsScript.Events.SheetsOnEdit): void | Promise<void> {
    return this._eventDispatcher.dispatch(AppsScriptEventType.EDIT, event);
  }

  /**
   * Handles Google Apps Script onChange events.
   *
   * @param   {GoogleAppsScript.Events.SheetsOnChange} event - The onChange event object.
   * @returns {void | Promise<void>}
   */
  public onChange(event: GoogleAppsScript.Events.SheetsOnChange): void | Promise<void> {
    return this._eventDispatcher.dispatch(AppsScriptEventType.CHANGE, event);
  }

  /**
   * Handles Google Apps Script onFormSubmit events.
   *
   * @param   {GoogleAppsScript.Events.FormsOnFormSubmit} event - The onFormSubmit event object.
   * @returns {void | Promise<void>}
   */
  public onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit): void | Promise<void> {
    return this._eventDispatcher.dispatch(AppsScriptEventType.FORM_SUBMIT, event);
  }
}
