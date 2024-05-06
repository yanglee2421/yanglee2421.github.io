export function jsonClone<TData>(params: TData) {
  try {
    return JSON.parse(JSON.stringify(params)) as TData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
