export function uuid(): string {
  if (typeof crypto !== "undefined") {
    const c = crypto as unknown as { randomUUID?: () => string };
    if (typeof c.randomUUID === "function") {
      return c.randomUUID();
    }
  }
  // fallback simple UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
