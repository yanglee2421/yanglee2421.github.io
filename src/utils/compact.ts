export function compact<TData>(list: Array<TData | Falsey>) {
  return list.filter(Boolean) as TData;
}

type Falsey = null | undefined | false | "" | 0 | 0n;
