import { timeout } from "@/utils/timeout";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { UserProfile } from "@/components/shared/UserProfile";
import { NavMenus } from "@/components/shared/NavMenus";
import { codeToHtml } from "shiki";
import classNames from "classnames";

export function Deferred() {
  const [query, setQuery] = React.useState({
    select: "0",
    input: "",
  });
  const deferredQuery = React.useDeferredValue(query);

  const isStale = !Object.is(query, deferredQuery);

  return (
    <div className="space-y-3 px-5 py-2">
      <UserProfile />
      <NavMenus />
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();

          const formData = new FormData(evt.currentTarget);

          setQuery({
            input: formData.get("input") as string,
            select: formData.get("select") as string,
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
          <button type="submit" disabled={isStale} className="btn-blue">
            submit
          </button>
          <button type="reset" className="btn-border">
            reset
          </button>
        </div>
      </form>
      <React.Suspense fallback={<p className="animate-pulse">loading</p>}>
        <FetchData query={deferredQuery} isStale={isStale} />
      </React.Suspense>
    </div>
  );
}

type Props = {
  query: NonNullable<unknown>;
  isStale?: boolean;
};

function FetchData(props: Props) {
  const query = useSuspenseQuery({
    queryKey: ["suspense", props.query],
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
      {props.isStale && (
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
