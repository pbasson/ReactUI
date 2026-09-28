interface ApiRequestOptions {
  prefix?: string;
  timeoutMs?: number;
}

export async function apiFetch(endpoint: string, options: ApiRequestOptions = {}): Promise<Response> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not configured.");
  }

  const port = process.env.API_BASE_PORT;
  if (!port || !/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) {
    throw new Error("API_BASE_PORT must be a port number between 1 and 65535.");
  }

  const address = new URL(baseUrl);
  if (!["http:", "https:"].includes(address.protocol)) {
    throw new Error("API_BASE_URL must use http or https.");
  }
  address.port = port;

  const url = [address.origin, options.prefix ?? process.env.API_MAIN_URL, endpoint]
    .filter(Boolean)
    .map(part => part!.replace(/^\/+|\/+$/g, ""))
    .join("/");

  console.log(`[API] GET ${url}`);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    signal: AbortSignal.timeout(options.timeoutMs ?? 10000),
    headers: process.env.XAPI_KEY ? { "X-API-KEY": process.env.XAPI_KEY } : undefined,
  });

  if (!response.ok) {
    throw new Error(`GET ${endpoint} failed: ${response.status}`);
  }

  return response;
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await apiFetch(endpoint);
  return await response.json();
}
