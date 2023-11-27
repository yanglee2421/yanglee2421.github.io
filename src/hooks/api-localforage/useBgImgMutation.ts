// Query Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Localforage
import localforage from "localforage";

export function useBgImgMutation() {
  const queryClient = useQueryClient();
  return useMutation<File, Error, File>({
    mutationFn(file) {
      return localforage.setItem("bg-img", file);
    },
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["bg-img"] });
    },
  });
}
