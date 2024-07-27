import { AuthGuard } from "@/components/guard/AuthGuard";
import { PageLayout } from "@/components/layout/PageLayout";
import { Table } from "./Table";

export function Component() {
  return (
    <AuthGuard>
      <PageLayout>
        <Table />
      </PageLayout>
    </AuthGuard>
  );
}
