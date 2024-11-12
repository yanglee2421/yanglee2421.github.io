import { type ActionFunction, type LoaderFunctionArgs } from "react-router-dom";
export { Lab as Component } from "./Lab";

export async function loader(args: LoaderFunctionArgs) {
  console.log("loader run", args);

  const url = new URL(args.request.url);

  return {
    title: "lab",
    search: Object.fromEntries(url.searchParams.entries()),
  };
}

export const action: ActionFunction = async (args) => {
  console.log("action run");

  const formData = await args.request.formData();

  return Object.fromEntries(formData.entries());
};
