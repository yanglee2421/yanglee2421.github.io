import { useQuery } from "@tanstack/react-query";
import localforage from "localforage";
import { nonPersistentQueryClient } from "@/lib/nonPersistentQueryClient";
import { FileStorageKey } from "./useForageFiles";
import { fileToFileKey } from "@/utils/fileToFileKey";

export function useForageFile(fileKey: string) {
  const queryKey = ["localforage_file", "file", fileKey];

  return useQuery<File>(
    {
      queryKey,
      async queryFn() {
        const xsData = await localforage.getItem(FileStorageKey.xsBgImg);
        const smData = await localforage.getItem(FileStorageKey.smBgImg);
        const data = [];

        if (Array.isArray(smData)) {
          data.push(...smData);
        }

        if (Array.isArray(xsData)) {
          data.push(...xsData);
        }

        const files = data.filter((item): item is File => item instanceof File);

        const file = files.find((item) => fileToFileKey(item) === fileKey);

        if (file instanceof File) {
          return file;
        }

        throw new Error("No such a file");
      },
    },
    nonPersistentQueryClient,
  );
}
