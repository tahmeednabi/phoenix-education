import axios, { AxiosRequestConfig } from "axios";

export type HttpExceptionClient = {
  status: number;
  message: string;
  errors?: ErrorDetails[];
};

export type ErrorDetails = {
  property: string;
  message: string;
};

export type FetchResponse<T> = {
  data?: T;
  error?: HttpExceptionClient;
};

type FetchConfig<T> = Partial<Omit<RequestInit, "body" | "params">> & {
  method?: string;
  body?: T;
  params?: T;
  headers?: Headers;
};

async function fetchWithMethod<R, T = any>(
  url: string,
  config: AxiosRequestConfig
): Promise<FetchResponse<R>> {
  return new Promise(async (resolve) => {
    const response = {};

    const _url = [
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_SERVER_URL : "",
      url,
    ];

    try {
      const res = await axios({
        ...config,
        url: _url.join(""),
      });

      if (res.status < 400) response["data"] = res.data;
      else response["error"] = res.data;

      resolve(response);
    } catch (err: any) {
      response["error"] = err.response?.data;
      resolve(response);
    }
  });
}

export async function useGet<R = any, T = any>(
  url: string,
  params?: T,
  config?: AxiosRequestConfig<T>
) {
  return fetchWithMethod<R, T>(url, { method: "GET", params, ...config });
}

export async function usePost<R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig<T>
) {
  return fetchWithMethod<R, T>(url, { method: "POST", data, ...config });
}

export async function usePatch<R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig<T>
) {
  return fetchWithMethod<R, T>(url, { method: "PATCH", data, ...config });
}

export async function usePut<R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig<T>
) {
  return fetchWithMethod<R, T>(url, { method: "PUT", data, ...config });
}

export async function useDelete<R = any>(
  url: string,
  config?: AxiosRequestConfig<any>
) {
  return fetchWithMethod<R>(url, { method: "DELETE", ...config });
}

export async function useMultipartForm<
  R = any,
  T extends { [key: string]: any } = any
>(url: string, data: T, config?: AxiosRequestConfig<T>) {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    // @ts-ignore
    formData.append(key, data[key]);
  }

  const defaultConfig = {
    "Content-Type": "multipart/form-data",
    ...config,
  };

  return fetchWithMethod<R, T>(url, {
    method: "POST",
    data: formData,
    ...defaultConfig,
  });
}
