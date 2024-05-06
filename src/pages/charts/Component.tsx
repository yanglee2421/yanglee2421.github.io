import { useHeadTitle } from "@/hooks/dom/useHeadTitle";
import { Charts } from "./Charts";

export function Component() {
  useHeadTitle("Charts");

  return <Charts />;
}
