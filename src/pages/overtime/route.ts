import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { getOptions } from "./queryOvertime";
export { Overtime as Component } from "./Overtime";

export async function loader(args: LoaderFunctionArgs) {
  const url = new URL(args.request.url);

  await queryClient.ensureQueryData(getOptions());

  return { url: url.search };
}

export async function action(args: ActionFunctionArgs) {
  await queryClient.invalidateQueries(getOptions());
  return { url: args.request.url };
}
