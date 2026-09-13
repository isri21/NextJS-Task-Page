import { ApiResponse } from "@/types/types";
import { ApiError } from "@/lib/errors";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  // Some endpoints (e.g. DELETE) may return an empty body on success.
  const text = await res.text();
  let body: ApiResponse<T>;
  try {
    body = text
      ? JSON.parse(text)
      : { success: res.ok, data: null, error: null, meta: null };
  } catch {
    throw new Error("Server returned an unexpected response");
  }

  if (!body.success || body.error) {
    throw new ApiError(
      body.error ?? { code: "UNKNOWN", message: "Something went wrong" }
    );
  }

  return body.data as T;
}
