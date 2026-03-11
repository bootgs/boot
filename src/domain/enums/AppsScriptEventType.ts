/**
 * Перечисление типов событий Google Apps Script.
 *
 * @see https://developers.google.com/apps-script/guides/triggers
 */
export enum AppsScriptEventType {
  /**
   * Срабатывает при установке дополнения.
   *
   * @see https://developers.google.com/apps-script/guides/triggers#oninstall
   */
  INSTALL = "INSTALL",

  /**
   * Срабатывает при открытии документа, таблицы, презентации или формы.
   *
   * @see https://developers.google.com/apps-script/guides/triggers#onopen
   */
  OPEN = "OPEN",

  /**
   * Срабатывает, когда пользователь изменяет значение ячейки в таблице.
   *
   * @see https://developers.google.com/apps-script/guides/triggers#onedit
   */
  EDIT = "EDIT",

  /**
   * Срабатывает, когда пользователь изменяет структуру таблицы (например, добавляет строку).
   *
   * @see https://developers.google.com/apps-script/guides/triggers/installable#change
   */
  CHANGE = "CHANGE",

  /**
   * Срабатывает, когда пользователь меняет выделение в таблице.
   *
   * @see https://developers.google.com/apps-script/guides/triggers#onselectionchange
   */
  SELECTION_CHANGE = "SELECTION_CHANGE",

  /**
   * Срабатывает, когда пользователь отправляет форму или отвечает на опрос.
   *
   * @see https://developers.google.com/apps-script/guides/triggers/installable#form-submit
   */
  FORM_SUBMIT = "FORM_SUBMIT"
}
