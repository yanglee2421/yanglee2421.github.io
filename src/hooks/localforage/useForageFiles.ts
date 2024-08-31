import { keepPreviousData, useQuery } from "@tanstack/react-query";
import localforage from "localforage";
import { toStringTag } from "@/utils/toStringTag";
import { useNonPersistQueryClient } from "../useNonPersistQueryClient";

export function useForageFiles() {
  const nonPersistQueryClient = useNonPersistQueryClient();

  return useQuery(
    {
      queryKey: ["localforage_files"],
      async queryFn() {
        const data = await localforage.getItem("localforage_files");

        if (!Array.isArray(data)) {
          throw new Error("excepted an array, got a" + toStringTag(data));
        }

        return data.filter((item): item is File => item instanceof File);
      },

      placeholderData: keepPreviousData,
    },
    nonPersistQueryClient,
  );
}
