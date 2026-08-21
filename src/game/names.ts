const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/g;
const SLASHES = /[\\/]+/g;

export function sanitizeName(value: string): string {
  return value
    .normalize("NFKC")
    .replace(CONTROL_CHARACTERS, "")
    .replace(SLASHES, "-")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 24);
}

export function normalizeName(value: string): string {
  return sanitizeName(value).toLocaleLowerCase("en-US");
}

export function displayName(value: string): string {
  return normalizeName(value).replace(/(^|[\s-])\p{L}/gu, (letter) =>
    letter.toLocaleUpperCase("en-US"),
  );
}

export function toRouteSegment(value: string): string {
  return encodeURIComponent(normalizeName(value));
}

export function fromRouteSegment(value: string): string {
  try {
    return sanitizeName(decodeURIComponent(value));
  } catch {
    return sanitizeName(value);
  }
}
