export function json2Csv(rows: Array<{}>, filename: string) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    rows.map((row) => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  link.click();
  link.remove();
}
