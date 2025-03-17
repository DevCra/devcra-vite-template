export const ROUTE_PATH_MAP = {
  Home: "/",
} as const;

export type RoutePath = (typeof ROUTE_PATH_MAP)[keyof typeof ROUTE_PATH_MAP];
