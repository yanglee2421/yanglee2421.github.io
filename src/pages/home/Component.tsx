import { AuthGuard } from "@/components/guard/AuthGuard";
import { PageLayout } from "@/components/layout/PageLayout";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";
import { Home } from "./Home";

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
