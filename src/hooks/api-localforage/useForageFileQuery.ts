import { useQuery } from "@tanstack/react-query";
import localforage from "localforage";

export function useForageFileQuery(key: string) {
  return useQuery<string[]>({
    queryKey: ["localforage", key],
    async queryFn() {
      const data = await localforage.getItem(key);

      if (!Array.isArray(data)) {
        throw new Error("excepted array");
      }

      const files = data.filter((item): item is Blob => item instanceof Blob);

      const oldList = map.get(key);

      if (oldList) {
        oldList.forEach(URL.revokeObjectURL);
      }

      map.set(
        key,
        files.map((item) => URL.createObjectURL(item)),
      );

      return map.get(key) || [];
    },

    retry: false,
  });
}

const map = new Map<string, string[]>();
