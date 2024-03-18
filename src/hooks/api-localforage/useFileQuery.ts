import React from "react";
import { FileQueryClient } from "@/utils/FileQueryClient";

export function useFileQuery<TData>({
  queryKey,
  queryFn,
}: UseFielQueryParams<TData>) {
  const query = fileQueryClient.get<TData>(queryKey);

  return React.useSyncExternalStore(
    (trigger) => {
      const unsubscribe = query.subscribe({
        queryFn,
        trigger,
      });

      if (query.result.isPending) {
        query.fetch(queryFn);
      }

      return () => {
        unsubscribe();
      };
    },

    () => query.result,
  );
}

export const fileQueryClient = new FileQueryClient();

type UseFielQueryParams<TData> = {
  queryKey: unknown[];
  queryFn(): Promise<TData>;
};
