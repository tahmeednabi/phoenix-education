import { HttpExceptionClient, removeEmpty } from "@common/utils";
import { useRef } from "react";
import _useSWR, { SWRConfiguration, useSWRConfig } from "swr";
import queryString from "query-string";

const fetcher = async (input: RequestInfo, config?: RequestInit) => {
  const res = await fetch(input, config);

  if (!res.ok) {
    const error: HttpExceptionClient = await res.json();
    const transformError = new Error(error.message);
    transformError["response"] = error;
    throw transformError;
  }

  return res.json();
};

/**
 * Use default SWR, typed, with error response
 * @param url
 * @param params
 */
export function useSWR<T>(url: string, params?: { [key: string]: any }) {
  let _params = "";
  if (params) _params = `?${queryString.stringify(removeEmpty(params))}`;

  const _url = `${url}${_params}`;

  return _useSWR<T, { response?: HttpExceptionClient }>(_url, fetcher, {
    errorRetryCount: 0,
  });
}

/**
 * Use SWR that does not revalidate on Focus or Reconnect
 * @param url
 * @param params
 */
export function useStaleSWR<T>(url: string, params?: { [key: string]: any }) {
  let _params = "";
  if (params) _params = `?${queryString.stringify(removeEmpty(params))}`;

  const _url = `${url}${_params}`;

  const { cache } = useSWRConfig();
  const revalidationOptions: SWRConfiguration = {
    revalidateOnMount: !cache.get(_url),
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 0,
  };

  return _useSWR<T, { response?: HttpExceptionClient }>(
    _url,
    fetcher,
    revalidationOptions
  );
}

function useStickyResult<T>(value: T) {
  const val = useRef<T>();
  if (value !== undefined) val.current = value;
  return val.current;
}

export function useStickyStaleSWR<T>(...args: Parameters<typeof useStaleSWR>) {
  const swr = useStaleSWR<T>(...args);
  return { ...swr, data: useStickyResult(swr.data) };
}

export function useStickySWR<T>(...args: Parameters<typeof useSWR>) {
  const swr = useSWR<T>(...args);
  return { ...swr, data: useStickyResult(swr.data) };
}
