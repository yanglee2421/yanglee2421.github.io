import { AuthGuard } from "@/components/guard/AuthGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";
import { Home } from "./Home";
import { PageLayout } from "./PageLayout";

export function Component() {
  useHeadTitle("Home");

  return (
    <AuthGuard>
      <PageLayout>
        <Home />
      </PageLayout>
    </AuthGuard>
  );
}
