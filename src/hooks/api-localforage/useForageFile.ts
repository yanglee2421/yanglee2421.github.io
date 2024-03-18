import localforage from "localforage";
import { fileToFileKey } from "@/utils/fileToFileKey";
import { toStringTag } from "@/utils/toStringTag";
import { useFileQuery } from "./useFileQuery";

export function useForageFile(fileKey: string) {
  return useFileQuery({
    queryKey: ["localforage_files", fileKey],
    async queryFn() {
      const data = await localforage.getItem("localforage_files");

      if (!Array.isArray(data)) {
        throw new Error("excepted an array, got a" + toStringTag(data));
      }

      const file = data.find(
        (item): item is File =>
          item instanceof File && fileToFileKey(item) === fileKey,
      );

      if (file instanceof File) {
        return file;
      }

      throw new Error("no such a file");
    },
  });
}
