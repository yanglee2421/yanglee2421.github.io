export function json2CsvLink<TRow extends NonNullable<unknown>>(
  rows: Array<TRow>,
) {
  return encodeURI(
    "data:text/csv;charset=utf-8," +
      [
        Object.keys(rows[0]).join(","),
        ...rows.map(Object.values).join(","),
      ].join("\n"),
  );
}
