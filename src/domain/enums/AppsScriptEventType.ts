/**
 * Enum for Google Apps Script event types.
 *
 * @see https://developers.google.com/apps-script/guides/triggers
 */
export enum AppsScriptEventType {

  /**
   * Triggered when an add-on is installed.
   *
   * @see https://developers.google.com/apps-script/guides/triggers#oninstall
   */
  INSTALL = "INSTALL",

  /**
   * Triggered when a document, spreadsheet, presentation, or form is opened.
   *
   * @see https://developers.google.com/apps-script/guides/triggers#onopen
   */
  OPEN = "OPEN",

  /**
   * Triggered when a user changes a cell value in a spreadsheet.
   *
   * @see https://developers.google.com/apps-script/guides/triggers#onedit
   */
  EDIT = "EDIT",

  /**
   * Triggered when a user changes the structure of a spreadsheet (e.g., adds a row).
   *
   * @see https://developers.google.com/apps-script/guides/triggers/installable#change
   */
  CHANGE = "CHANGE",

  /**
   * Triggered when a user changes the selection in a spreadsheet.
   *
   * @see https://developers.google.com/apps-script/guides/triggers#onselectionchange
   */
  SELECTION_CHANGE = "SELECTION_CHANGE",

  /**
   * Triggered when a user submits a form or responds to a quiz.
   *
   * @see https://developers.google.com/apps-script/guides/triggers/installable#form-submit
   */
  FORM_SUBMIT = "FORM_SUBMIT"
}
