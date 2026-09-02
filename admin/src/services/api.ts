const API_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:4000";

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `API error: ${response.status}`;

    try {
      const data = await response.json();

      if (typeof data?.message === "string") {
        message = data.message;
      } else if (typeof data?.error === "string") {
        message = data.error;
      } else if (typeof data?.details === "string") {
        message = data.details;
      }
    } catch {
      // Ignore invalid or empty error responses.
    }

    throw new Error(message);
  }

  // 204 No Content : aucune donnée JSON à parser.
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}