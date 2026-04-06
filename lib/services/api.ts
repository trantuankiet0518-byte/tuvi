import { failure, success, type ApiResult } from "@/lib/api-schema";

export async function postJson<TResponse, TBody>(
  url: string,
  body: TBody,
  init?: RequestInit
): Promise<ApiResult<TResponse>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      body: JSON.stringify(body),
      ...init,
    });

    const data = (await response.json()) as TResponse | { error?: string; message?: string };
    if (!response.ok) {
      const message =
        typeof data === "object" && data && "message" in data && typeof data.message === "string"
          ? data.message
          : typeof data === "object" && data && "error" in data && typeof data.error === "string"
            ? data.error
            : "Request failed.";
      return failure("request_failed", message, data);
    }

    return success(data as TResponse);
  } catch (error) {
    return failure(
      "network_error",
      error instanceof Error ? error.message : "Network request failed.",
      error
    );
  }
}
