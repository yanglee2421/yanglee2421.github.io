import { useQuery, useQueryClient } from "@tanstack/react-query";
import localforage from "localforage";

export function useBgImgQuery() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["localforage-bg-img"],
    async queryFn() {
      const prev = queryClient.getQueryData(["localforage-bg-img"]);

      if (typeof prev === "string") {
        URL.revokeObjectURL(prev);
      }

      const file = await localforage.getItem("bg-img");

      if (file instanceof File) {
        return URL.createObjectURL(file);
      }

      throw new Error("");
    },

    staleTime: Infinity,
    gcTime: Infinity,

    retry: false,
  });
}
