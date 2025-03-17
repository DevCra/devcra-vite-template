import { httpClient } from "./httpClient";

const getSth = ({
  queryStrings,
  options = {},
  headers = {},
}: {
  queryStrings: any;
  options?: RequestInit;
  headers?: HeadersInit;
}): Promise<any> => {
  const qs = new URLSearchParams(queryStrings).toString();

  return httpClient
    .get({ url: `/sth?${qs}`, options, headers })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

const getSthDetail = ({
  id,
  options = {},
  headers = {},
}: {
  id: string;
  options?: RequestInit;
  headers?: HeadersInit;
}): Promise<any> => {
  return httpClient
    .get({ url: `/sth/${id}`, options, headers })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
