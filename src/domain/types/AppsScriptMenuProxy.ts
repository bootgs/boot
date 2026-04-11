/**
 * A Proxy object that can be used to handle Google Apps Script menu actions.
 */
export type AppsScriptMenuProxy = {
  [key: string]: (event: GoogleAppsScript.Events.AppsScriptEvent) => void;
};
