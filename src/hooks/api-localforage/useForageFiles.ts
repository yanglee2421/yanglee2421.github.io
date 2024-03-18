import localforage from "localforage";
import useSWR from "swr";
import { toStringTag } from "@/utils/toStringTag";

export function useForageFiles() {
  return useSWR<File[]>(["localforage_files"], async ([storageKey]) => {
    const data = await localforage.getItem(storageKey);

    if (!Array.isArray(data)) {
      throw new Error("excepted an array, got a" + toStringTag(data));
    }

    return data.filter((item): item is File => item instanceof File);
  });
}
