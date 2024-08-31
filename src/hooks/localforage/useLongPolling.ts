import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useLongPolling() {
  const [enabled, setEnabled] = React.useState(true);

  const query = useQuery({
    queryKey: ["long_polling"],
    async queryFn({ signal }) {
      const res = await fetch("/api", { signal });
      return await res.json();
    },

    enabled,
    refetchInterval: 1000,
  });

  const refetch = query.refetch;

  React.useEffect(() => {
    if (query.isError) {
      query.error.name === "502" ? refetch() : setEnabled(false);

      return;
    }

    if (query.isSuccess) {
      query.data.hasNotifcation && console.log("do something");
      query.data.needRefetch && refetch();

      return;
    }
  }, [
    query.isError,
    query.error,
    query.isSuccess,
    query.data,
    refetch,
    setEnabled,
  ]);
}
