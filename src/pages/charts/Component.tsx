import { Charts } from "./Charts";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function Component() {
  useHeadTitle("Charts");

  return <Charts />;
}
