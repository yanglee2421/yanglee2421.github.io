export function uniqBy<TItem extends NonNullable<unknown>>(
  items: TItem[],
  ops: Partial<Ops> = {},
) {
  const { overwrite = false, key = "id" } = ops;

  const map = items.reduce((map, item) => {
    const mapKey = Reflect.get(item, key);

    if (overwrite) {
      map.set(mapKey, item);
      return map;
    }

    if (!map.get(mapKey)) {
      map.set(mapKey, item);
    }

    return map;
  }, new Map<unknown, TItem>());

  return [...map.values()];
}

type Ops = {
  key: string | symbol;
  overwrite: boolean;
};
