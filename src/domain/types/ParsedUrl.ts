import { ParsedUrlQuery } from "./ParsedUrlQuery";

export interface ParsedUrl {
  pathname: string;
  path: string;
  search?: string;
  query: ParsedUrlQuery;
}
