import { Button } from "@mui/material";
import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <>
            <h1>{error.statusText}</h1>
            <p>{error.data}</p>
            <Button component={Link} to={"/"}>
              take me home
            </Button>
          </>
        );
      default:
        return (
          <>
            <h1>{error.statusText}</h1>
            <p>{error.data}</p>
            <Button component={Link} to={"/"}>
              take me home
            </Button>
          </>
        );
    }
  }

  if (error instanceof Error) {
    return (
      <>
        {error.message}
        <Button component={Link} to={"/"}>
          take me home
        </Button>
      </>
    );
  }

  return (
    <Button component={Link} to={"/"}>
      take me home
    </Button>
  );
}
