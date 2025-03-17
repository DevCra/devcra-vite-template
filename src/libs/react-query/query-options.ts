import { queryOptions } from "@tanstack/react-query";

export const reactQueryOptions = {
  sth: () =>
    queryOptions({
      queryKey: ["STH"],
      queryFn: () => {},
    }),
  sthDetail: (id: string) =>
    queryOptions({
      queryKey: ["STH", { id }],
      queryFn: () => {},
    }),
};
