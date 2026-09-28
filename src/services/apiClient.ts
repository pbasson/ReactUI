export interface ApiRequestOptions {
  prefix?: string;
  timeoutMs?: number;
}

type ApiFetchOptions = ApiRequestOptions & 
  ( | { method?: "GET"; body?: never } | { method: "POST" | "PUT"; body?: unknown } );

export async function apiFetch(endpoint: string, options: ApiFetchOptions = {}): Promise<Response> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) throw new Error("API_BASE_URL is not configured.");

  const address = new URL(baseUrl);

  if (!["http:", "https:"].includes(address.protocol)) throw new Error("API_BASE_URL must use http or https.");

  const port = process.env.API_BASE_PORT?.trim();

  if (port) {
    const portNumber = Number(port);

    if (!/^\d+$/.test(port) || portNumber < 1 || portNumber > 65535) throw new Error("API_BASE_PORT must be between 1 and 65535.");

    address.port = String(portNumber);
  }

  const url = [address.origin, options.prefix ?? process.env.API_MAIN_URL, endpoint]
    .filter(Boolean).map(part => part!.replace(/^\/+|\/+$/g, "")).join("/");

  const method = options.method ?? "GET";
  const headers = new Headers();
  if (process.env.XAPI_KEY) headers.set("X-API-KEY", process.env.XAPI_KEY);

  const body = options.body === undefined ? undefined : JSON.stringify(options.body);
  if (body !== undefined) headers.set("Content-Type", "application/json");

  const response = await fetch(url, { method, cache: "no-store", 
    signal: AbortSignal.timeout(options.timeoutMs ?? 10000), headers, body});

  if (!response.ok) throw new Error(`${method} ${endpoint} failed: ${response.status}`);

  return response;
}

export async function apiGet<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const response = await apiFetch(endpoint, options);
  return await response.json();
}

// Write endpoints may return JSON or an empty response (for example HTTP 204).
async function readWriteResponse<T>(response: Response): Promise<T | undefined> {
  const text = await response.text();
  return text.trim() ? JSON.parse(text) as T : undefined;
}

export async function apiPost<T = unknown>( endpoint: string, data: unknown, options: ApiRequestOptions = {} )
  : Promise<T | undefined> {
    const response = await apiFetch(endpoint, { ...options, method: "POST", body: data });
    return readWriteResponse<T>(response);
}

export async function apiPut<T = unknown>( endpoint: string, data: unknown, options: ApiRequestOptions = {} ) 
  : Promise<T | undefined> {
    const response = await apiFetch(endpoint, { ...options, method: "PUT", body: data });
    return readWriteResponse<T>(response);
}
