export function list2Tree(
  list: Array<{
    id: number;
    parentId: number;
  }>,
) {
  const allIds = list.map((item) => item.id);

  return list
    .map((item, idx, arr) => {
      void idx;

      return {
        ...item,
        children: arr.filter((el) => Object.is(el.parentId, item.id)),
      };
    })
    .filter((item) => !allIds.includes(item.parentId));
}
