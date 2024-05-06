import { Navigate, useMatches, useSearchParams } from "react-router-dom";

export function NavigateToHome() {
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  if (!matches.length) {
    return null;
  }

  searchParams.delete("returnURL");

  return (
    <Navigate
      to={{
        pathname: searchParams.get("returnURL") || "/",
        search: searchParams.toString(),
      }}
    />
  );
}
