import { Navigate, useLocation, useSearchParams } from "react-router";
import * as conf from "@/lib/conf";

export const NavigateToLogin = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  search.set("redirect_uri", location.pathname);

  return (
    <Navigate
      to={{
        pathname: conf.LOGIN_PATH,
        search: search.toString(),
      }}
      replace
    />
  );
};
