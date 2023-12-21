/**
 * @description Clone an object through JSON. If the given parameters cannot be serialized, return null.
 * @param params An object that can be serialized
 * @returns An new object or null
 */
export function toJsonClone<TData>(params: TData) {
  try {
    return JSON.parse(JSON.stringify(params)) as TData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
