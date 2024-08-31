import { keepPreviousData, useQuery } from "@tanstack/react-query";
import localforage from "localforage";
import { fileToFileKey } from "@/utils/fileToFileKey";
import { toStringTag } from "@/utils/toStringTag";
import { useNonPersistQueryClient } from "../useNonPersistQueryClient";

export function useForageFile(fileKey: string) {
  const nonPersistQueryClient = useNonPersistQueryClient();

  return useQuery(
    {
      queryKey: ["localforage_files", fileKey],
      async queryFn() {
        const data = await localforage.getItem("localforage_files");

        if (!Array.isArray(data)) {
          throw new Error("excepted an array, got a" + toStringTag(data));
        }

        const file = data.find((item): item is File => {
          return item instanceof File && fileToFileKey(item) === fileKey;
        });

        if (file instanceof File) {
          return file;
        }

        throw new Error("no such a file");
      },

      placeholderData: keepPreviousData,
    },
    nonPersistQueryClient,
  );
}
