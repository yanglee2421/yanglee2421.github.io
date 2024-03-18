import { useMutation } from "@tanstack/react-query";
import localforage from "localforage";
import { nonPersistentQueryClient } from "@/lib/nonPersistentQueryClient";

export function useForageFileMutation() {
  return useMutation<string, Error, Req>(
    {
      async mutationFn(req) {
        await localforage.setItem(req.fileKey, req.file);

        return req.fileKey;
      },
      onError(error) {
        console.error(error);
      },
      onSuccess() {
        nonPersistentQueryClient.invalidateQueries({
          queryKey: ["localforage_file"],
        });
      },
    },
    nonPersistentQueryClient,
  );
}

interface Req {
  fileKey: string;
  file: File;
}
