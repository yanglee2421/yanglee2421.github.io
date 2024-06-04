import { useHeadTitle } from "@/hooks/dom/useHeadTitle";
import { Home } from "./Home";
import { PageLayout } from "./PageLayout";
import { AuthGuard } from "@/components/guard/AuthGuard";

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
