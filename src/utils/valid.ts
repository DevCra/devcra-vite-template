import { REGEX_PUNCTUATIONS } from "@/constants/regex";

export const isEmptyObject = (obj: object): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const isValidPunctuation = (str: string): boolean => {
  const regExp = REGEX_PUNCTUATIONS;
  return regExp.test(str);
};

export const isObjectEquals = (x: object, y: object): boolean => {
  if (x === null || x === undefined || y === null || y === undefined) {
    return x === y;
  }
  // after this just checking type of one would be enough
  if (x.constructor !== y.constructor) {
    return false;
  }
  // if they are functions, they should exactly refer to same one (because of closures)
  if (x instanceof Function) {
    return x === y;
  }
  // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
  if (x instanceof RegExp) {
    return x === y;
  }
  if (x === y || x.valueOf() === y.valueOf()) {
    return true;
  }
  if (Array.isArray(x) && Array.isArray(y) && x.length !== y.length) {
    return false;
  }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) {
    return false;
  }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) {
    return false;
  }
  if (!(y instanceof Object)) {
    return false;
  }

  // recursive object equality check
  const p = Object.keys(x);
  return (
    Object.keys(y).every(function (i) {
      return p.indexOf(i) !== -1;
    }) &&
    p.every(function (i: string) {
      return isObjectEquals(x[i as keyof typeof x], y[i as keyof typeof y]);
    })
  );
};
