import { envConfig } from "@/config";

// import "server-only";

export type FetchOptions = RequestInit & {
  query?: Record<
    string,
    string | number | boolean | (string | number | boolean)[] | undefined
  >;
};

const BASE_URL = `${envConfig.API_ENDPOINT}`;

function queryBuilder(query?: FetchOptions["query"]) {
  if (!query) return "";
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      // add multiple keys -> query=a&query=b
      value.forEach((v) => searchParams.append(key, String(v)));
    } else {
      searchParams.append(key, String(value));
    }
  });

  return `?${searchParams.toString()}`;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { query, headers, ...rest } = options;
  const url = `${BASE_URL}/${endpoint.replace(/^\/+/g, "")}${queryBuilder(
    query
  )}`;

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Client-ID ${envConfig.UNSPLASH_ACCESS_TOKEN}`,
      ...(headers || {}),
    },
  });
  if (res.status === 404) return null as T;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Error fetching ${endpoint}: ${message ?? res.statusText}`);
  }
  return await res.json();
}
