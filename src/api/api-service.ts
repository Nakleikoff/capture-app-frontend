export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: { message: string } };

export async function getData<T>(input: RequestInfo): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_JWT_TOKEN}`,
  };

  const response = await fetch(input, {
    method: 'GET',
    headers,
  });

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

export async function postData<T>(
  input: RequestInfo,
  body?: BodyInit,
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_JWT_TOKEN}`,
  };

  const initialize = {
    method: 'POST',
    headers,
    body,
  };
  const response = await fetch(input, initialize);

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
