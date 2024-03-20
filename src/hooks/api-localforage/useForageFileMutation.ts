import { useMutation } from "@tanstack/react-query";
import localforage from "localforage";
import { fileToFileKey } from "@/utils/fileToFileKey";
import { useNonPersistQueryClient } from "../useNonPersistQueryClient";

export function useForageFileMutation() {
  const nonPersistQueryClient = useNonPersistQueryClient();

  return useMutation({
    async mutationFn(arg: File) {
      const data = await localforage.getItem("localforage_files");

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

      const persistFiles = await localforage.setItem(
        "localforage_files",
        files,
      );
      const persistFile = persistFiles.find(
        (item) => fileToFileKey(item) === fileToFileKey(arg),
      );

      if (persistFile instanceof File) {
        return persistFile;
      }

      throw new Error("no such a file");
    },
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      nonPersistQueryClient.invalidateQueries({
        queryKey: ["localforage_files"],
      });
    },
  });
}
