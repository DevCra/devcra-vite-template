import { REGEX_SNAKE_CASE } from "@/constants/regex";

export const getNumberWithComma = (num: number): string =>
  new Intl.NumberFormat("ko-KR").format(num);

export const getSnakeToCamel = (str: string): string =>
  str.toLowerCase().replace(REGEX_SNAKE_CASE, (group) => group.toUpperCase().replace("_", ""));
