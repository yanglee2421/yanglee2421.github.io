import { NavLink } from "react-router-dom";

export function InternalServerError() {
  return (
    <>
      <title>Internal Server Error</title>
      <NavLink to="/">Take me home</NavLink>;
    </>
  );
}
