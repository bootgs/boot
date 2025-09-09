import {
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpStatus,
  RequestMethod
} from "../types";

/**
 * Creates a structured {@link HttpResponse} object based on the incoming request, a desired HTTP status, headers, and response data.
 *
 * It automatically determines the `statusText` and `ok` status based on the `resolvedStatus`.
 * For successful responses (2xx status codes), the `body` contains the `data`.
 * For error responses (non-2xx status codes), the `body` is wrapped in an `error` object.
 *
 * @param   request - The original request object, used to infer default status for GET/POST.
 * @param   status - The desired HTTP status code. If `undefined`, it defaults to `OK` for GET/HEAD/OPTIONS and `CREATED` for others.
 * @param   [headers={}] - Optional custom headers to include in the response.
 * @param   [data=null] - The data to be sent in the response body.
 * @returns A structured object representing the HTTP response.
 */
export function createResponse(
  request: HttpRequest,
  status: HttpStatus | undefined,
  headers: HttpHeaders | undefined = {},
  data: unknown = null
): HttpResponse {
  const resolvedStatus =
    status ??
    ([RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS].includes(
      request.method
    )
      ? HttpStatus.OK
      : HttpStatus.CREATED);

  const statusText = ((): string => {
    const entry = Object.entries(HttpStatus).find(
      ([, value]) => value === resolvedStatus
    );

    return entry ? entry[0] : "UNKNOWN_STATUS";
  })();

  const ok = resolvedStatus >= 200 && resolvedStatus < 300;

  return {
    headers,
    ok,
    status: resolvedStatus,
    statusText,
    body: ok ? data : { error: data }
  };
}
