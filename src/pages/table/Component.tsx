import { AuthGuard } from "@/components/guard/AuthGuard";
import { Table } from "./Table";

export function Component() {
  return (
    <AuthGuard>
      <title>Table</title>
      <Table />
    </AuthGuard>
  );
}
