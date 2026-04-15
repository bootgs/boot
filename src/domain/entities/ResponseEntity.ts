import { ContentMimeType, HttpStatus } from "../enums";

/**
 * Class representing an HTTP response, including the status code, headers, and body.
 */
export class ResponseEntity<T = any> {
  private readonly body: T | null;
  private readonly status: HttpStatus;
  private readonly headers: Record<string, string>;
  private readonly produces?: ContentMimeType;

  /**
   * @param   {T | null} body - The response body.
   * @param   {HttpStatus} status - The HTTP status code.
   * @param   {Record<string, string>} headers - The HTTP headers.
   * @param   {ContentMimeType} [produces] - The desired MIME type.
   */
  constructor(
    body: T | null,
    status: HttpStatus,
    headers: Record<string, string> = {},
    produces?: ContentMimeType
  ) {
    this.body = body;
    this.status = status;
    this.headers = headers;
    this.produces = produces;
  }

  /**
   * Creates a builder for a ResponseEntity with the given status.
   *
   * @param   {HttpStatus} status - The HTTP status code.
   * @returns {ResponseEntityBuilder} The builder.
   */
  public static status(status: HttpStatus): ResponseEntityBuilder {
    return new ResponseEntityBuilder(status);
  }

  /**
   * Creates a ResponseEntity with an OK status.
   *
   * @param   {T} [body] - The response body.
   * @returns {ResponseEntity<T>} The ResponseEntity.
   */
  public static ok<T>(body: T | null = null): ResponseEntity<T> {
    return new ResponseEntity<T>(body, HttpStatus.OK);
  }

  /**
   * Creates a ResponseEntity with a CREATED status.
   *
   * @param   {T} [body] - The response body.
   * @returns {ResponseEntity<T>} The ResponseEntity.
   */
  public static created<T>(body: T | null = null): ResponseEntity<T> {
    return new ResponseEntity<T>(body, HttpStatus.CREATED);
  }

  /**
   * Creates a ResponseEntity with an ACCEPTED status.
   *
   * @param   {T} [body] - The response body.
   * @returns {ResponseEntity<T>} The ResponseEntity.
   */
  public static accepted<T>(body: T | null = null): ResponseEntity<T> {
    return new ResponseEntity<T>(body, HttpStatus.ACCEPTED);
  }

  /**
   * Creates a ResponseEntity with a NO_CONTENT status.
   *
   * @returns {ResponseEntity<void>} The ResponseEntity.
   */
  public static noContent(): ResponseEntity<void> {
    return new ResponseEntity<void>(null, HttpStatus.NO_CONTENT);
  }

  /**
   * Creates a ResponseEntity with a BAD_REQUEST status.
   *
   * @returns {ResponseEntity<void>} The ResponseEntity.
   */
  public static badRequest(): ResponseEntity<void> {
    return new ResponseEntity<void>(null, HttpStatus.BAD_REQUEST);
  }

  /**
   * Creates a ResponseEntity with a NOT_FOUND status.
   *
   * @returns {ResponseEntity<void>} The ResponseEntity.
   */
  public static medicalNotFound(): ResponseEntity<void> {
    return new ResponseEntity<void>(null, HttpStatus.NOT_FOUND);
  }

  /**
   * Returns the response body.
   *
   * @returns {T | null} The response body.
   */
  public getBody(): T | null {
    return this.body;
  }

  /**
   * Returns the HTTP status code.
   *
   * @returns {HttpStatus} The HTTP status code.
   */
  public getStatusCode(): HttpStatus {
    return this.status;
  }

  /**
   * Returns the HTTP headers.
   *
   * @returns {Record<string, string>} The HTTP headers.
   */
  public getHeaders(): Record<string, string> {
    return this.headers;
  }

  /**
   * Returns the desired MIME type.
   *
   * @returns {ContentMimeType | undefined} The desired MIME type.
   */
  public getProduces(): ContentMimeType | undefined {
    return this.produces;
  }
}

/**
 * Builder for ResponseEntity.
 */
class ResponseEntityBuilder {
  private readonly status: HttpStatus;
  private headers: Record<string, string> = {};
  private produces?: ContentMimeType;

  /**
   * @param   {HttpStatus} status - The HTTP status code.
   */
  constructor(status: HttpStatus) {
    this.status = status;
  }

  /**
   * Adds a header to the response.
   *
   * @param   {string} name - The header name.
   * @param   {string} value - The header value.
   * @returns {ResponseEntityBuilder} The builder.
   */
  public header(name: string, value: string): ResponseEntityBuilder {
    this.headers[name] = value;
    return this;
  }

  /**
   * Sets the produces MIME type.
   *
   * @param   {ContentMimeType} produces - The MIME type.
   * @returns {ResponseEntityBuilder} The builder.
   */
  public contentType(produces: ContentMimeType): ResponseEntityBuilder {
    this.produces = produces;
    return this;
  }

  /**
   * Builds the ResponseEntity with the given body.
   *
   * @param   {T} [body] - The response body.
   * @returns {ResponseEntity<T>} The ResponseEntity.
   */
  public body<T>(body: T | null = null): ResponseEntity<T> {
    return new ResponseEntity<T>(body, this.status, this.headers, this.produces);
  }

  /**
   * Builds the ResponseEntity with no body.
   *
   * @returns {ResponseEntity<void>} The ResponseEntity.
   */
  public build(): ResponseEntity<void> {
    return new ResponseEntity<void>(null, this.status, this.headers, this.produces);
  }
}
