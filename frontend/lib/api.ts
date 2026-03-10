const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:1211/api";

/**
 * Lấy access token từ cookie (client side)
 */
function getAccessToken(): string | undefined {
  if (typeof window === "undefined") return;

  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];
}

/**
 * API request wrapper
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  const url = `${API_BASE}${endpoint}`;

  const token = getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // gửi cookie nếu backend dùng httpOnly
  });

  const contentType = response.headers.get("content-type");

  let data: any = null;

  if (contentType?.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
}

//////////////////////////////////////////////////////
// AUTH API
//////////////////////////////////////////////////////

export const authApi = {

  login: (data: { username: string; password: string }) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data: { username: string; email: string; password: string }) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  profile: () =>
    apiRequest("/auth/profile"),

  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),

};

//////////////////////////////////////////////////////
// PRODUCT API
//////////////////////////////////////////////////////

export const productApi = {

  getAll: () =>
    apiRequest("/products"),

  getById: (id: string) =>
    apiRequest(`/products/${id}`),

  create: (data: any) =>
    apiRequest("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiRequest(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiRequest(`/products/${id}`, {
      method: "DELETE",
    }),

};