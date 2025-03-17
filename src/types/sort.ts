export type SortCompareFn = (
  a: Record<string, string | number>,
  b: Record<string, string | number>,
  filterKey: string,
) => number;
