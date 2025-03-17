import { axiosInstance } from "./axios";

export const http = {
  get: <Request = any, Response = unknown>(url: string, params?: Request) => {
    return axiosInstance.get<Response>(url, { params }).then((res) => res.data);
  },
  post: <Request = any, Response = unknown>(url: string, data?: Request) => {
    return axiosInstance.post<Response>(url, data).then((res) => res.data);
  },
  put: <Request = any, Response = unknown>(url: string, data?: Request) => {
    return axiosInstance.put<Response>(url, data).then((res) => res.data);
  },
  delete: <Request = any, Response = unknown>(url: string, data?: Request) => {
    return axiosInstance.delete<Response>(url, { data }).then((res) => res.data);
  },
} as const;
