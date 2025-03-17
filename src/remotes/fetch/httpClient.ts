import { COMMON_HEADERS, HTTP_METHODS } from "@/constants/http";

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  init() {}

  setBaseUrl(newBaseUrl: string) {
    this.baseUrl = newBaseUrl;
  }

  request({
    url,
    method,
    options,
    headers,
  }: {
    url: string;
    method: keyof typeof HTTP_METHODS;
    options?: RequestInit;
    headers?: HeadersInit;
  }) {
    const injectOptions: RequestInit = {
      ...options,
      method,
      headers: {
        ...COMMON_HEADERS,
        ...headers,
      },
    };

    return fetch(`${this.baseUrl}${url}`, injectOptions);
  }

  get({ url, options, headers }: { url: string; options?: RequestInit; headers?: HeadersInit }) {
    return this.request({
      url,
      method: HTTP_METHODS.GET,
      options,
      headers,
    });
  }

  post({ url, options, headers }: { url: string; options?: RequestInit; headers?: HeadersInit }) {
    return this.request({
      url,
      method: HTTP_METHODS.POST,
      options,
      headers,
    });
  }

  put({ url, options, headers }: { url: string; options?: RequestInit; headers?: HeadersInit }) {
    return this.request({
      url,
      method: HTTP_METHODS.PUT,
      options,
      headers,
    });
  }

  delete({ url, options, headers }: { url: string; options?: RequestInit; headers?: HeadersInit }) {
    return this.request({
      url,
      method: HTTP_METHODS.DELETE,
      options,
      headers,
    });
  }

  patch({ url, options, headers }: { url: string; options?: RequestInit; headers?: HeadersInit }) {
    return this.request({
      url,
      method: HTTP_METHODS.PATCH,
      options,
      headers,
    });
  }
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const httpClient = new HttpClient(BASE_URL);
