import { type LoaderFunction } from "react-router-dom";

export const loader: LoaderFunction = async (args) => {
  console.log("loader run", args);

  const url = new URL(args.request.url);

  return Object.fromEntries(url.searchParams.entries());
};
