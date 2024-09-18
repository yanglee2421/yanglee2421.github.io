import { timeout } from "@/utils/timeout";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { UserProfile } from "@/components/shared/UserProfile";
import { NavMenus } from "@/components/shared/NavMenus";
import { codeToHtml } from "shiki";
import classNames from "classnames";

export function Deferred() {
  const [isPending, startTransition] = React.useTransition();
  const [query, setQuery] = React.useState({
    select: "0",
    input: "",
  });

  return (
    <div className="space-y-3 px-5 py-2">
      <UserProfile />
      <NavMenus />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();

            const formData = new FormData(evt.currentTarget);

            startTransition(() => {
              setQuery({
                input: formData.get("input") as string,
                select: formData.get("select") as string,
              });
            });
          }}
          className="space-y-3"
        >
          <fieldset>
            <input
              name="input"
              type="text"
              defaultValue={query.input}
              className="block w-full"
            />
          </fieldset>
          <fieldset>
            <select
              name="select"
              defaultValue={query.select}
              className="block w-full"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </fieldset>
          <div className="flex gap-2">
            <button disabled={isPending} type="submit" className="btn-blue">
              submit
            </button>
            <button type="reset" className="btn-border">
              reset
            </button>
          </div>
        </form>
        <div className="space-y-3">
          <fieldset>
            <input
              value={query.input}
              onChange={(evt) => {
                setQuery((prev) => ({ ...prev, input: evt.target.value }));
              }}
              type="text"
              className="block w-full"
            />
          </fieldset>
          <fieldset>
            <select
              value={query.select}
              onChange={(evt) => {
                setQuery((prev) => ({ ...prev, select: evt.target.value }));
              }}
              className="block w-full"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </fieldset>
        </div>
      </div>
      <React.Suspense fallback={<p className="animate-pulse">loading</p>}>
        <FetchData query={query} isStale={isPending} />
      </React.Suspense>
    </div>
  );
}

type Props = {
  query: NonNullable<unknown>;
  isStale?: boolean;
};

function FetchData(props: Props) {
  const deferredQuery = React.useDeferredValue(props.query);
  const isStale = !Object.is(props.query, deferredQuery);
  const isPending = isStale || props.isStale;

  const query = useSuspenseQuery({
    queryKey: ["suspense", deferredQuery],
    async queryFn() {
      await timeout(1000 * 2);
      const res = await codeToHtml(JSON.stringify(props.query, null, 2), {
        lang: "json",
        theme: "dark-plus",
      });

      return res;
    },
  });

  return (
    <div className="relative overflow-hidden rounded">
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/25">
          <p className="animate-pulse capitalize text-white">feting...</p>
        </div>
      )}
      <div
        className={classNames("border-t")}
        dangerouslySetInnerHTML={{ __html: query.data }}
      ></div>
    </div>
  );
}
