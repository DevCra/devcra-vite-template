import { EXPIRE_INFINITE_TIME } from "@/constants/time";

export const getCookie = (key: string): string | null => {
  let targetCookie = "";
  const documentCookies = document.cookie?.split("; ") ?? [];

  documentCookies.forEach((documentCookie) => {
    const [k, v] = documentCookie.split("=");
    if (k === key) targetCookie = v;
  });

  return targetCookie !== "" ? targetCookie : null;
};

export const setCookie = (key: string, value: any, maxAge = EXPIRE_INFINITE_TIME): void => {
  const addedCookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    value,
  )}; max-age=${maxAge}; path=/; secure`;

  document.cookie = addedCookie;
};

export const deleteCookie = (key: string): void => {
  const deletedCookie = `${encodeURIComponent(key)}=; max-age=-1; path=/; secure`;

  document.cookie = deletedCookie;
};

export const deleteAllCookies = (): void => {
  const cookies = document.cookie.split(";");

  cookies.forEach((cookie, idx) => {
    document.cookie = cookies[idx] + "=;expires=" + new Date(0).toUTCString();
  });
};
