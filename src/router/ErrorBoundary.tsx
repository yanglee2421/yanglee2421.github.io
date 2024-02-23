import { Button } from "@mui/material";
import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import { NotFound } from "@/pages/404/NotFound";
import { InternalServerError } from "@/pages/500/InternalServerError";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return <NotFound></NotFound>;
      default:
        return (
          <>
            <h1>{error.statusText}</h1>
            <p>{error.data}</p>
            <Button variant="contained" component={Link} to={"/"}>
              take me home
            </Button>
          </>
        );
    }
  }

  if (error instanceof Error) {
    return <InternalServerError></InternalServerError>;
  }

  return (
    <Button variant="contained" component={Link} to={"/"}>
      take me home
    </Button>
  );
}
