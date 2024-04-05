import { useHeadTitle } from "@/hooks/dom/useHeadTitle";
import { Virtual } from "./Virtual";

export function Component() {
  useHeadTitle("Virtual");

  return <Virtual />;
}
