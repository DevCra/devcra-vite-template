import { REGEX_PUNCTUATIONS } from "@/constants/regex";

export const isEmptyObject = (obj: object): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const isValidPunctuation = (str: string): boolean => {
  const regExp = REGEX_PUNCTUATIONS;
  return regExp.test(str);
};
