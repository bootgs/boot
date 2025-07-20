import { HttpHeaders } from "./HttpHeaders";
import { HttpStatus } from "./HttpStatus";

export interface HttpResponse {
  headers: HttpHeaders;
  ok: boolean;
  status: HttpStatus;
  statusText: string;
  body: unknown;
}
