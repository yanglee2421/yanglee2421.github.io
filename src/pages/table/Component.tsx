import { Table } from "./Table";
import { PageLayout } from "@/components/layout/PageLayout";
import { AuthGuard } from "@/components/guard/AuthGuard";

export function Component() {
  return (
    <AuthGuard>
      <PageLayout>
        <Table />
      </PageLayout>
    </AuthGuard>
  );
}
