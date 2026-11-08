/**
 * URL-safe slug from a supplier code: lowercase, and every run of characters other than a-z and
 * 0-9 (dots, spaces, "+", "*", "/") becomes one "-". "WB.0240.C" -> "wb-0240-c", "WB.0144" -> "wb-0144".
 */
export const productSlug = (code: string) =>
  code
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
