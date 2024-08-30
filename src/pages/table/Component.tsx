import { AuthGuard } from "@/components/guard/AuthGuard";
import { Table } from "./Table";

export function Component() {
  return (
    <AuthGuard>
      <Table />
    </AuthGuard>
  );
}
