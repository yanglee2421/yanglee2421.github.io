// Query Imports
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Localforage Imports
import localforage from "localforage";

export function useBgImgQuery() {
  const queryClient = useQueryClient();
  return useQuery<string, Error>({
    queryKey: ["bg-img"],
    async queryFn() {
      const prev = queryClient.getQueryData(["bg-img"]);
      if (typeof prev === "string") {
        URL.revokeObjectURL(prev);
      }

      const file = await localforage.getItem<File>("bg-img");

      if (file) {
        return URL.createObjectURL(file);
      }

      throw new Error();
    },

    staleTime: 0,
    retry: false,
  });
}
