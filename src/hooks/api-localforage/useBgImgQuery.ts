// Query Imports
import { useQuery } from "@tanstack/react-query";

// Localforage Imports
import localforage from "localforage";

export function useBgImgQuery() {
  return useQuery<string, Error>({
    queryKey: ["bg-img"],
    async queryFn() {
      const file = await localforage.getItem<File>("bg-img");

      if (file) {
        return URL.createObjectURL(file);
      }

      throw new Error();
    },

    staleTime: 0,
  });
}
