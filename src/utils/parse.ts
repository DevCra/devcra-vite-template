import { REGEX_HTML_TAG } from "@/constants/regex";

export const getDeletedHTMLTagsFromString = (text: string): string =>
  text.replace(REGEX_HTML_TAG, "");
