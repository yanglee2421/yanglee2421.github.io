// API Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usr_post } from "@/api/mock";
import { Req, Res } from "@/api/mock/usr_post";

// Toast Imports
import { toast } from "react-hot-toast";

export function useUsrPost() {
  // API Hooks
  const queryClient = useQueryClient();
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return usr_post(req);
    },
    onSuccess(data) {
      queryClient.setQueryData<Res>(["usr_get"], (prev) => {
        if (prev) {
          return { ...prev, ...data };
        }
        return data;
      });
    },
    onError(err) {
      toast.error(err.message);
    },
  });
}
