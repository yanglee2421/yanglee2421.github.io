import { NavLink } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <title>Not Found</title>
      <NavLink to={{ pathname: "/" }}>Take me home</NavLink>;
    </>
  );
}
