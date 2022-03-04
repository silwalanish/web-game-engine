export function isNonEmptyString(string) {
  return string && typeof string === "string" && string.trim();
}
