export const HTTP_METHODS = {
  GET: "GET",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export const RESPONSE_ERROR = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER: 500,
} as const;

export const COMMON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
};
