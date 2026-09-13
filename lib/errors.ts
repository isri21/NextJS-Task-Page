import { ApiErrorShape } from "@/types/types";

export class ApiError extends Error {
  code: string;
  details?: ApiErrorShape["details"];

  constructor(shape: ApiErrorShape) {
    super(shape.message);
    this.name = "ApiError";
    this.code = shape.code;
    this.details = shape.details;
  }
}

/**
 * Turns an ApiError's field-level `details` (e.g. { name: ["too short"] })
 * into one readable line. Falls back to the top-level message, then a
 * generic string. Safe to pass any thrown value.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.details) {
      const lines = Object.entries(error.details).flatMap(([field, messages]) =>
        messages.map((msg) => `${field}: ${msg}`)
      );
      if (lines.length > 0) return lines.join(" ");
    }
    return error.message || "Something went wrong";
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}
