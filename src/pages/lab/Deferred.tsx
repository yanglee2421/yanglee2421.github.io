import { timeout } from "@/utils/timeout";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export function Deferred() {
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);

  console.log("deferredQuery", query, deferredQuery);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(evt) => {
          setQuery(evt.target.value);
        }}
      />
      <p>{Object.is(query, deferredQuery) || "syncing"}</p>
      <React.Suspense fallback={<p className="animate-pulse">loading</p>}>
        <FetchData query={deferredQuery}></FetchData>
      </React.Suspense>
    </>
  );
}

type Props = {
  query: string;
};

function FetchData(props: Props) {
  console.log("fetch data");

  const query = useSuspenseQuery({
    queryKey: ["suspense", props.query],
    async queryFn() {
      await timeout(1000 * 2);
      return props.query;
    },
    staleTime: 0,
    gcTime: 1000,
  });

  return <p>{query.data}</p>;
}
/**
 * Deferred value
 * 1. value params change
 * 2. dispatch normal update, keep deferred value as old value (do commit to screen)
 * 3. dispatch transition update, deferred value as same as value (do not commit to screen)
 * 4.
 */
