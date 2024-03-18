import localforage from "localforage";
import { fileToFileKey } from "@/utils/fileToFileKey";
import { fileQueryClient } from "./useFileQuery";

export function useForageFileMutation() {
  return async (arg: File) => {
    const data = await localforage.getItem("localforage_files");

    const files = [];
    if (Array.isArray(data)) {
      files.push(...data.filter((item): item is File => item instanceof File));
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

    const persistFiles = await localforage.setItem("localforage_files", files);
    const persistFile = persistFiles.find(
      (item) => fileToFileKey(item) === fileToFileKey(arg),
    );

    if (persistFile instanceof File) {
      fileQueryClient.invalidate(["localforage_files"]);
      return persistFile;
    }

    throw new Error("system error");
  };
}
