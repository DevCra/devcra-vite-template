export const getCapitalizedString = (str: string): string => {
  const strLowercase = str.toLowerCase();
  const capitalizedStr = strLowercase.charAt(0).toUpperCase() + strLowercase.slice(1);

  return capitalizedStr;
};

export const getRandomString = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (byte) => chars[byte % chars.length]).join("");
};
