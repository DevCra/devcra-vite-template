import Axios from "axios";

import { RESPONSE_ERROR } from "@/constants/http";

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      response: { status },
    } = error;

    if (status === RESPONSE_ERROR.UNAUTHORIZED) {
      window.location.href = "/login";
    }

    return await Promise.reject(error);
  },
);
