export function fileToFileKey(file: File) {
  return [file.lastModified, file.name, file.size, file.type].join("-");
}
