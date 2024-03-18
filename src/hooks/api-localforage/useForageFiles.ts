import { useQuery } from "@tanstack/react-query";
import localforage from "localforage";
import { nonPersistentQueryClient } from "@/lib/nonPersistentQueryClient";
import { toStringTag } from "@/utils/toStringTag";

export function useForageFiles(fileStorageKey: FileStorageKey) {
  const queryKey = ["localforage_file", "files", fileStorageKey];

  return useQuery<File[]>(
    {
      queryKey,
      async queryFn() {
        const data = await localforage.getItem(fileStorageKey);

        if (!Array.isArray(data)) {
          throw new Error("excepted an array, got a" + toStringTag(data));
        }

        return data.filter((item): item is File => item instanceof File);
      },
    },
    nonPersistentQueryClient,
  );
}

export enum FileStorageKey {
  xsBgImg = "xsBgImg",
  smBgImg = "smBgImg",
}
