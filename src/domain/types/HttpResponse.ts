import { HttpHeaders } from "./HttpHeaders";
import { HttpStatus } from "domain/enums";

export interface HttpResponse {
  headers: HttpHeaders;
  ok: boolean;
  status: HttpStatus;
  statusText: string;
  body: unknown;
}
