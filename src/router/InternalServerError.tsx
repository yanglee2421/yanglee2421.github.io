import { NavLink } from "react-router-dom";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function InternalServerError() {
  useHeadTitle("Internal Server Error");

  return <NavLink to="/">Take me home</NavLink>;
}
