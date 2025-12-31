export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string | number; message: string } };

export async function apiRequest<RES, REQ = undefined>(
  input: RequestInfo,
  body?: REQ,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
): Promise<ApiResponse<RES>> {
  const token = import.meta.env.VITE_API_JWT_TOKEN;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${input}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const { success, error } = await response.json();
      const errorMessage =
        error.details.message || 'An unexpected error occurred.';

      return {
        success,
        error: { code: error.code, message: errorMessage },
      };
    }

    const { success, data } = await response.json();

    return { success, data };
  } catch (error: any) {
    const message = error?.message ?? 'Network error';
    return { success: false, error: { code: 'NETWORK_ERROR', message } };
  }
}
