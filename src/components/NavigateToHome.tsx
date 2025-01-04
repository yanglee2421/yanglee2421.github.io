import { Navigate, useSearchParams } from "react-router";
import * as conf from "@/lib/conf";

export const NavigateToHome = () => {
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  search.delete("redirect_uri");

  return (
    <Navigate
      to={{
        pathname: searchParams.get("redirect_uri") || conf.HOME_PATH,
        search: search.toString(),
      }}
      replace
    />
  );
};
