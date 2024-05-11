export function withinTruthy(list: unknown[]) {
  return list.some(Boolean);
}
