import { ParsedUrlQuery } from "./ParsedUrlQuery";

export interface ParsedUrl {
  path?: string | undefined;
  pathname?: string | undefined;
  search?: string | undefined;
  query?: string | undefined | ParsedUrlQuery;
}
