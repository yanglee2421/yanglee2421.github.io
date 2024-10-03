import { timeout } from "@/utils/timeout";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import classNames from "classnames";
import { Slider } from "./Slider";
import { Lab } from "./Lab";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useLoaderData,
  Form,
  useActionData,
  useSearchParams,
} from "react-router-dom";
import { type loader, type action } from "./route";
import { Card } from "@/components/ui/card";
import { hightlighter } from "@/lib/hightlighter";

export function Deferred() {
  const [params, setParams] = React.useState({
    select: "",
    input: "",
  });

  const highlighter = React.use(hightlighter);

  const query = useQuery({
    queryKey: ["suspense", params],
    async queryFn() {
      await timeout(1000 * 1);
      const res = highlighter.codeToHtml(JSON.stringify(params, null, 2), {
        lang: "json",
        theme: "dark-plus",
      });

      return res;
    },

    // notifyOnChangeProps: "all",
    enabled: !!params.select,
  });

  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;
  const [, setSearchParams] = useSearchParams();

  console.log(data, actionData);

  return (
    <div className="space-y-6">
      <title>{data.title}</title>
      <div className="grid grid-cols-1 gap-3 rounded border p-3 shadow md:grid-cols-2">
        <div className="col-span-full">
          {query.isPending && (
            <p className="animate-pulse capitalize">pending...</p>
          )}
          {query.isError && <p>{query.error.message}</p>}
          {query.isSuccess && (
            <div
              className={classNames("border-t")}
              dangerouslySetInnerHTML={{ __html: query.data }}
            ></div>
          )}
        </div>
        <UncontrolerForm
          onSubmit={(formData) => {
            setParams({
              input: formData.get("input") as string,
              select: formData.get("select") as string,
            });
          }}
        />
        <div className="space-y-3">
          <fieldset>
            <Input
              value={params.input}
              onChange={(evt) => {
                setParams((prev) => ({ ...prev, input: evt.target.value }));
              }}
              type="text"
              className="block w-full"
            />
          </fieldset>
          <fieldset>
            <Select
              value={params.select}
              onValueChange={(evt) => {
                setParams((prev) => ({ ...prev, select: evt }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="hale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </fieldset>
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
      <Card className="p-3">
        <Form method="post" className="space-y-6">
          <Input type="text" name="title" />
          <Input type="text" name="description" />
          <div className="flex gap-2">
            <Button type="submit" className="uppercase">
              Create
            </Button>
            <Button
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("now", Date.now().toString());
                  return prev;
                });
              }}
              variant={"outline"}
              type="button"
              className="uppercase"
            >
              search
            </Button>
          </div>
        </Form>
      </Card>
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
        <Input name="input" type="text" />
      </fieldset>
      <fieldset>
        <Select name="select">
          <SelectTrigger>
            <SelectValue placeholder="hale" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
      </fieldset>
      <div className="flex gap-2">
        <Button disabled={isPending} type="submit" className="uppercase">
          submit
        </Button>
        <Button variant={"outline"} type="reset" className="uppercase">
          reset
        </Button>
      </div>
    </form>
  );
}
