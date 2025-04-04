import { Navigate, useLocation, useSearchParams } from "react-router";
import { HOME_PATH, LOGIN_PATH } from "@/lib/constants";

export const NavigateToHome = () => {
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  search.delete("redirect_uri");

  return (
    <Navigate
      to={{
        pathname: searchParams.get("redirect_uri") || HOME_PATH,
        search: search.toString(),
      }}
      replace
    />
  );
};

export const NavigateToLogin = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  search.set("redirect_uri", location.pathname);

  return (
    <Navigate
      to={{
        pathname: LOGIN_PATH,
        search: search.toString(),
      }}
      replace
    />
  );
};
