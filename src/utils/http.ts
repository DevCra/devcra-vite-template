import { isEmptyObject } from "./valid";

export const getQueryString = (qs: object): string =>
  isEmptyObject(qs) ? "" : `?${new URLSearchParams({ ...qs }).toString()}`;
