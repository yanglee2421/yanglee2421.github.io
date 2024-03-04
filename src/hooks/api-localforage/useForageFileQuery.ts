import { useQuery, useQueryClient } from "@tanstack/react-query";
import localforage from "localforage";

export function useForageFileQuery(fileKey: string) {
  const queryClient = useQueryClient();

  return useQuery<Res>({
    queryKey: ["localforage", "file", fileKey],
    async queryFn() {
      const prev = queryClient.getQueryData<Res>([
        "localforage",
        "file",
        fileKey,
      ]);

      if (typeof prev?.src === "string") {
        URL.revokeObjectURL(prev.src);
      }

      const file = await localforage.getItem(fileKey);

      if (file instanceof File) {
        return {
          filename: file.name,
          type: file.type,
          src: URL.createObjectURL(file),
        };
      }

      throw new Error("no file");
    },

    retry: false,
  });
}

interface Res {
  filename: string;
  type: string;
  src: string;
}
