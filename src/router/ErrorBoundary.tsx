import { useRouteError, Link } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div>
      <p>{errorToMsg(error)}</p>
      <Link to={"/"}>take me home</Link>
    </div>
  );
}

function errorToMsg(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Oh, something wrong";
}
