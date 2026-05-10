const BASE_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || '');

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

// --- Main client ---
async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, params } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const init: RequestInit = {
    method,
    headers: { 
      "Content-Type": "application/json", 
      ...headers 
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw { status: res.status, message: err?.detail || res.statusText };
  }

  return res.json();
}

export const api = {
  get: <T,>(endpoint: string, params?: Record<string, string>) => apiClient<T>(endpoint, { params }),
  post: <T,>(endpoint: string, body: unknown) => apiClient<T>(endpoint, { method: "POST", body }),
  put: <T,>(endpoint: string, body: unknown) => apiClient<T>(endpoint, { method: "PUT", body }),
  patch: <T,>(endpoint: string, body: unknown) => apiClient<T>(endpoint, { method: "PATCH", body }),
  delete: <T,>(endpoint: string) => apiClient<T>(endpoint, { method: "DELETE" }),
};

// Endpoints
export const CATEGORY_ENDPOINT = '/api/category';
