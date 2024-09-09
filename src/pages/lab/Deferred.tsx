import { timeout } from "@/utils/timeout";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export function Deferred() {
  const [query, setQuery] = React.useState("initial data");
  const deferredQuery = React.useDeferredValue(query);
  const [show, setShow] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  console.log(query, "deferredQuery", deferredQuery);

  return (
    <div className="space-y-3 px-5 py-2">
      <fieldset>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={show}
            onChange={(evt) => {
              startTransition(() => {
                setShow(evt.target.checked);
              });
            }}
          />
          <span>show suspense</span>
        </label>
      </fieldset>
      <fieldset>
        <input
          type="text"
          value={query}
          onChange={(evt) => {
            setQuery(evt.target.value);
          }}
        />
      </fieldset>
      <p>{!Object.is(query, deferredQuery) && "syncing"}</p>
      <p>{isPending && "pending"}</p>
      {show && (
        <React.Suspense fallback={<p className="animate-pulse">loading</p>}>
          <FetchData query={deferredQuery}></FetchData>
        </React.Suspense>
      )}
    </div>
  );
}

type Props = {
  query: string;
};

function FetchData(props: Props) {
  console.log("query props", props.query);

  const query = useSuspenseQuery({
    queryKey: ["suspense", props.query],
    async queryFn() {
      await timeout(1000 * 2);
      return props.query;
    },
    staleTime: 0,
    gcTime: 1000,
  });

  console.log("query data", query.data);

  return <p className="border-t">{query.data}</p>;
}
/**
 * Deferred value
 * 1. value params change
 * 2. dispatch normal update, keep deferred value as old value (do commit to screen)
 * 3. dispatch transition update, deferred value as same as value (do not commit to screen)
 * 4.
 */
