function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function getErrorMessage(
  error: unknown,
  fallback = "Unknown error",
): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (isRecord(error) && typeof error.message === "string") {
    return error.message;
  }

  return fallback;
}

export function getErrorStatus(error: unknown): number | undefined {
  if (isRecord(error) && typeof error.status === "number") {
    return error.status;
  }

  return undefined;
}
