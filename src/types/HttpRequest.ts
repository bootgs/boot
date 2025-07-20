import { HttpHeaders } from "./HttpHeaders";
import { ParsedUrl } from "./ParsedUrl";
import { RequestMethod } from "./RequestMethod";

export interface HttpRequest {
  headers: HttpHeaders;
  method: RequestMethod;
  url: ParsedUrl;
  body: unknown;
}
