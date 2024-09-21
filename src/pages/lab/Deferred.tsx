import { timeout } from "@/utils/timeout";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { createHighlighterCore } from "shiki/core";
import getWasm from "shiki/wasm";
import classNames from "classnames";
import { Slider } from "./Slider";
import { Lab } from "./Lab";

export function Deferred() {
  const [query, setQuery] = React.useState({
    select: "",
    input: "",
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 rounded border p-3 shadow md:grid-cols-2">
        <UncontrolerForm
          onSubmit={(formData) => {
            setQuery({
              input: formData.get("input") as string,
              select: formData.get("select") as string,
            });
          }}
        />
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
              <option value="">none</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </fieldset>
        </div>
        <div className="col-span-full">
          {query.select && (
            <React.Suspense fallback={<p className="animate-pulse">loading</p>}>
              <FetchData query={query} />
            </React.Suspense>
          )}
        </div>
      </div>

      <div className="rounded border p-3 shadow">
        <Slider />
      </div>
      <div className="rounded border p-3 shadow">
        <React.Suspense fallback={<p className="animate-pulse">Suspense...</p>}>
          <Lab p={1} />
          <Lab p={2} />
        </React.Suspense>
      </div>
    </div>
  );
}

type Props = {
  query: NonNullable<unknown>;
};

function FetchData(props: Props) {
  const deferredQuery = React.useDeferredValue(props.query);
  const isPending = !Object.is(props.query, deferredQuery);

  const highlighter = useSuspenseQuery({
    queryKey: ["shiki", "dark-plus", "json"],
    queryFn() {
      return createHighlighterCore({
        themes: [import("shiki/themes/dark-plus.mjs")],
        langs: [import("shiki/langs/json.mjs")],
        loadWasm: getWasm,
      });
    },
  }).data;

  const query = useSuspenseQuery({
    queryKey: ["suspense", deferredQuery],
    async queryFn() {
      await timeout(1000 * 2);
      const res = highlighter.codeToHtml(JSON.stringify(props.query, null, 2), {
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
          <p className="animate-pulse capitalize text-white">fetching...</p>
        </div>
      )}
      <div
        className={classNames("border-t")}
        dangerouslySetInnerHTML={{ __html: query.data }}
      ></div>
    </div>
  );
}

type UncontrolerFormProps = {
  onSubmit(data: FormData): void;
};

function UncontrolerForm(props: UncontrolerFormProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const formData = new FormData(evt.currentTarget);

        startTransition(() => {
          props.onSubmit(formData);
        });
      }}
      className="space-y-3"
    >
      <fieldset>
        <input name="input" type="text" className="block w-full" />
      </fieldset>
      <fieldset>
        <select name="select" className="block w-full">
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
  );
}
