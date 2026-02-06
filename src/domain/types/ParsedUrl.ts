export interface ParsedUrlQuery {
  [key: string]: string | string[] | undefined;
}

export interface ParsedUrl {
  pathname: string;
  path: string;
  search?: string;
  query: ParsedUrlQuery;
}
