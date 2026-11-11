/** Lowercase and drop everything but letters and digits, so "WB.0240.C", "wb 0240 c" and "wb0240c" compare equal. */
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "");

/**
 * True when every word of the query appears in the product's name or code. Case, spaces and
 * punctuation are ignored; an empty query matches everything.
 */
export function matchesProductSearch(
  query: string,
  product: { name: string; code?: string | undefined },
) {
  const terms = query.split(/\s+/).map(normalize).filter(Boolean);
  if (terms.length === 0) return true;
  const name = normalize(product.name);
  const code = normalize(product.code ?? "");
  // The whole query is also tried as one code, so "VW 9E1128-3" matches across the space.
  const whole = terms.join("");
  if (code && code.includes(whole)) return true;
  return terms.every((term) => name.includes(term) || code.includes(term));
}
