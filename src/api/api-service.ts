export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: { message: string } };

export async function apiRequest<RES,REQ = undefined>(
  input: RequestInfo,
  body?: REQ,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
): Promise<ApiResponse<RES>> {

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_JWT_TOKEN}`,
  };

  const initialize = {
    method,
    headers,
    body: !!body ? JSON.stringify(body) : undefined,
  };
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${input}`, initialize);

  if (!response.ok) {
    const { success, error } = await response.json();
    const errorMessage = error || 'An unexpected error occurred.';

    return {
      success,
      error: errorMessage,
    };
  }

  const { success, data } = await response.json();

  return { success, data };
}
