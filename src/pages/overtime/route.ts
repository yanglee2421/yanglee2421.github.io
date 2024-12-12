import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { queryClient } from "@/lib/queryClient";
import { getOptions } from "./queryOvertime";
export { Overtime as Component } from "./Overtime";
import { auth } from "@/api/firebase/app";

export async function loader(args: LoaderFunctionArgs) {
  const url = new URL(args.request.url);

  await queryClient.ensureQueryData(
    getOptions({ userId: auth.currentUser?.uid || "" }),
  );

  return { url: url.search };
}

export async function action(args: ActionFunctionArgs) {
  await queryClient.invalidateQueries(
    getOptions({ userId: auth.currentUser?.uid || "" }),
  );
  return { url: args.request.url };
}
