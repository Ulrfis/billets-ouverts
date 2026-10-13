export const DREAM_DAY_KEY = "billets-ouverts-dreams";

/** Local prototype allowance, not a server spending limit. */
export function dreamCount(raw: string | null, day: string): number {
  try {
    const value = JSON.parse(raw ?? "{}") as { day?: unknown; n?: unknown };
    return value?.day === day && typeof value.n === "number" && Number.isSafeInteger(value.n) && value.n >= 0 ? value.n : 0;
  } catch { return 0; }
}

export function dreamAllowance(count: number, limit: number): boolean {
  return count < limit;
}