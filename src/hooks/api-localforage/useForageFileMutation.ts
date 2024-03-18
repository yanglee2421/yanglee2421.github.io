import localforage from "localforage";
import useSWRMutation from "swr/mutation";
import { fileToFileKey } from "@/utils/fileToFileKey";

export function useForageFileMutation() {
  return useSWRMutation<File, Error, string[], File>(
    ["localforage_files"],
    async ([storageKey], { arg }) => {
      const data = await localforage.getItem(storageKey);

      const files = [];
      if (Array.isArray(data)) {
        files.push(
          ...data.filter((item): item is File => item instanceof File),
        );
      }

      const idx = files.findIndex(
        (item) => fileToFileKey(item) === fileToFileKey(arg),
      );

      switch (idx) {
        case -1:
          files.push(arg);
          break;
        default:
          files[idx] = arg;
      }

      const persistFiles = await localforage.setItem(storageKey, files);
      const persistFile = persistFiles.find(
        (item) => fileToFileKey(item) === fileToFileKey(arg),
      );

      if (persistFile instanceof File) {
        return persistFile;
      }

      throw new Error("system error");
    },
  );
}
