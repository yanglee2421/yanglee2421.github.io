// Query Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";
import localforage from "localforage";

export function useFOrageFileMutation() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, Req>({
    async mutationFn(req) {
      await localforage.setItem(req.fileKey, req.file);

      return req.fileKey;
    },
    onError(error) {
      console.error(error);
    },
    onSuccess(data, req) {
      void data;

      queryClient.invalidateQueries({
        queryKey: ["localforage", "file", req.fileKey],
      });
    },
  });
}

interface Req {
  fileKey: string;
  file: File;
}
