export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export const coreVersion = "1.0.0";
