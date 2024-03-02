export function compact<TData>(list: Array<TData | Falsey>) {
  return list.filter(Boolean) as TData[];
}

export type Falsey = null | undefined | false | "" | 0 | 0n;
