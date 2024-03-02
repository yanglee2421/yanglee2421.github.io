import { Home } from "./Home";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function Component() {
  useHeadTitle("Home");

  return <Home></Home>;
}
