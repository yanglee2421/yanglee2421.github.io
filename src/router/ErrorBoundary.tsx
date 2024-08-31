import { useRouteError, Link } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();

  const errMsg = (() => {
    if (error instanceof Error) {
      return error.message;
    }

    return "Oh, something wrong";
  })();

  return (
    <div>
      <p>{errMsg}</p>
      <Link to={"/"}>take me home</Link>
    </div>
  );
}
