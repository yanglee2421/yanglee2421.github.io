import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { queryOvertime } from "./queryOvertime";
export { Overtime as Component } from "./Overtime";

export async function loader(args: LoaderFunctionArgs) {
  const url = new URL(args.request.url);

  await queryClient.ensureQueryData(queryOvertime());

  return {};
}

export async function action(args: ActionFunctionArgs) {
  await queryClient.invalidateQueries(queryOvertime());
  return Response.json({});
}
