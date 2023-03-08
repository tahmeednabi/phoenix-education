export function removeEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null)
      .map(([k, v]) => [
        k,
        typeof v === "object" && !Array.isArray(v) ? removeEmpty(v) : v,
      ])
  );
}

export function removeEmptyString(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v && String(v).trim() !== "")
      .map(([k, v]) => [
        k,
        typeof v === "object" && !Array.isArray(v) ? removeEmptyString(v) : v,
      ])
  );
}

export function getNonNullKeys(obj: any): any {
  if (obj === null) {
    return undefined;
  }
  if (typeof obj === "object") {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined) delete obj[key];
    }
  }
  return obj;
}
