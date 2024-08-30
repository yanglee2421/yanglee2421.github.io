import { NavLink } from "react-router-dom";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function NotFound() {
  useHeadTitle("Not Found");

  return <NavLink to={{ pathname: "/" }}>Take me home</NavLink>;
}
