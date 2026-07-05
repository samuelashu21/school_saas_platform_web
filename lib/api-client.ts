const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.school-management.local/v1";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;
  
  // Construct dynamic URL arguments safely
  let url = `${BASE_URL}${endpoint}`;
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    // Expand to handle Authorization Bearer injections when wired to NextAuth
    ...headers,
  };

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: defaultHeaders,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }

    // Handle empty payloads gracefully
    if (response.status === 204) return {} as T;

    return await response.json();
  } catch (error) {
    console.error(`[API Client Failure] Route: ${endpoint}`, error);
    throw error;
  }
}