import type { SortCompareFn } from "@/types/sort";

export const dateCompareFunction: SortCompareFn = (a, b, filterKey) => {
  return new Date(a[filterKey]).getTime() - new Date(b[filterKey]).getTime();
};

export const numberCompareFunction: SortCompareFn = (a, b, filterKey) => {
  return Number(a[filterKey]) - Number(b[filterKey]);
};
