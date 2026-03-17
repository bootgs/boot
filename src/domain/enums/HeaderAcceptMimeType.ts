/**
 * Перечисление MIME-типов, используемых в заголовке Accept для определения формата ответа.
 *
 * @see https://developers.google.com/apps-script/reference/content/mime-type
 */
export enum HeaderAcceptMimeType {

  /**
   * Специальный тип для возврата JSON-строки напрямую (без TextOutput).
   * Используется для внутренних нужд Google Apps Script.
   */
  GOOGLE_TEXT = "google/plain",

  /**
   * Специальный тип для возврата JSON-строки напрямую (без TextOutput).
   * Используется для внутренних нужд Google Apps Script.
   */
  GOOGLE_JSON = "google/json",

  /**
   * HTML контент.
   *
   * @see https://developers.google.com/apps-script/reference/html/html-service
   */
  HTML = "text/html",

  /**
   * Простой текст.
   *
   * @see https://developers.google.com/apps-script/reference/content/mime-type
   */
  TEXT = "text/plain",

  /**
   * Данные в формате JSON.
   *
   * @see https://developers.google.com/apps-script/reference/content/mime-type
   */
  JSON = "application/json"
}
