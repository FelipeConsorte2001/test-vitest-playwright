export function sanitizeStr(text: string): string {
  return !text || typeof text !== "string" ? "" : text.trim().normalize();
}
