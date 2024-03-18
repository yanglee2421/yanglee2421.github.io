import localforage from "localforage";
import useSWR from "swr";
import { fileToFileKey } from "@/utils/fileToFileKey";
import { toStringTag } from "@/utils/toStringTag";

export function useForageFile(fileKey: string) {
  return useSWR(
    ["localforage_files", fileKey],
    async ([storageKey, fileKey]) => {
      const data = await localforage.getItem(storageKey);

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
  );
}
