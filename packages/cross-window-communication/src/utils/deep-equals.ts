export function deepEquals<T>(a: T, b: T): boolean {
  if (a === b) return true;

  const bothAreObjects =
    a && b && typeof a === "object" && typeof b === "object";

  return Boolean(
    bothAreObjects &&
      Object.keys(a).length === Object.keys(b).length &&
      Object.entries(a).every(([k, v]) => deepEquals(v, b[k as keyof T]))
  );
}
