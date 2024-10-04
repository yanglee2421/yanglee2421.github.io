import { queryOptions } from "@tanstack/react-query";
import { authReady as authReadyPromise } from "@/api/firebase/app";

export const authReady = queryOptions({
  queryKey: ["firebase", "authReady"],
  async queryFn() {
    await authReadyPromise;
    return {};
  },
});
