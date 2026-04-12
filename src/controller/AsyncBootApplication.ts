import { isString } from "apps-script-utils";
import { ApplicationConfig, AppsScriptMenuProxy } from "../domain/types";
import { AppsScriptEventType, RequestMethod } from "../domain/enums";
import { BaseBootApplication } from "./BaseBootApplication";

/**
 * Asynchronous application class for bootstrapping and handling Google Apps Script events.
 */
export class AsyncBootApplication extends BaseBootApplication {
  /**
   * Creates a new instance of AsyncBootApplication.
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

        return async (event: GoogleAppsScript.Events.AppsScriptEvent): Promise<void> => {
          await this._eventDispatcher.dispatchByName(prop, event);
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
   * @returns {Promise<GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string>} The response.
   */
  public async doGet(
    event: GoogleAppsScript.Events.DoGet
  ): Promise<GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string> {
    const { request, response } = this.handleHttpRequestInternal(RequestMethod.GET, event);
    const resolvedResponse = response instanceof Promise ? await response : response;
    return this._responseBuilder.wrap(request, resolvedResponse);
  }

  /**
   * Handles Google Apps Script doPost events.
   *
   * @param   {GoogleAppsScript.Events.DoPost} event - The doPost event object.
   * @returns {Promise<GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string>} The response.
   */
  public async doPost(
    event: GoogleAppsScript.Events.DoPost
  ): Promise<GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string> {
    const { request, response } = this.handleHttpRequestInternal(RequestMethod.POST, event);
    const resolvedResponse = response instanceof Promise ? await response : response;
    return this._responseBuilder.wrap(request, resolvedResponse);
  }

  /**
   * Handles Google Apps Script onInstall events.
   *
   * @param   {GoogleAppsScript.Events.AddonOnInstall} event - The onInstall event object.
   * @returns {Promise<void>}
   */
  public async onInstall(event: GoogleAppsScript.Events.AddonOnInstall): Promise<void> {
    await this._eventDispatcher.dispatch(AppsScriptEventType.INSTALL, event);
  }

  /**
   * Handles Google Apps Script onOpen events.
   *
   * @param   {GoogleAppsScript.Events.AppsScriptEvent} event - The onOpen event object.
   * @returns {Promise<void>}
   */
  public async onOpen(event: GoogleAppsScript.Events.AppsScriptEvent): Promise<void> {
    await this._eventDispatcher.dispatch(AppsScriptEventType.OPEN, event);
  }

  /**
   * Handles Google Apps Script onEdit events.
   *
   * @param   {GoogleAppsScript.Events.SheetsOnEdit} event - The onEdit event object.
   * @returns {Promise<void>}
   */
  public async onEdit(event: GoogleAppsScript.Events.SheetsOnEdit): Promise<void> {
    await this._eventDispatcher.dispatch(AppsScriptEventType.EDIT, event);
  }

  /**
   * Handles Google Apps Script onChange events.
   *
   * @param   {GoogleAppsScript.Events.SheetsOnChange} event - The onChange event object.
   * @returns {Promise<void>}
   */
  public async onChange(event: GoogleAppsScript.Events.SheetsOnChange): Promise<void> {
    await this._eventDispatcher.dispatch(AppsScriptEventType.CHANGE, event);
  }

  /**
   * Handles Google Apps Script onFormSubmit events.
   *
   * @param   {GoogleAppsScript.Events.FormsOnFormSubmit} event - The onFormSubmit event object.
   * @returns {Promise<void>}
   */
  public async onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit): Promise<void> {
    await this._eventDispatcher.dispatch(AppsScriptEventType.FORM_SUBMIT, event);
  }
}
