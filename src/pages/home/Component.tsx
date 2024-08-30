import { AuthGuard } from "@/components/guard/AuthGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";
import { Home } from "./Home";

export function Component() {
  useHeadTitle("Home");

  return (
    <AuthGuard>
      <Home />
    </AuthGuard>
  );
}
