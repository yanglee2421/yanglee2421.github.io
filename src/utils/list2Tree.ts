export function list2Tree<
  TRow extends {
    id: number;
    parentId: number;
  },
>(list: TRow[]) {
  const allIds = list.map((item) => item.id);
  const clonedList = structuredClone(list);

  clonedList.forEach((item, idx, arr) => {
    void idx;

    Reflect.set(
      item,
      "children",
      arr.filter((el) => Object.is(el.parentId, item.id)),
    );
  });

  return clonedList.filter(
    (item): item is TreeRow<TRow> => !allIds.includes(item.parentId),
  );
}

type TreeRow<TRow> = TRow & {
  children: Array<TreeRow<TRow>>;
};
