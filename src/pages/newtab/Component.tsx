import { AuthGuard } from "@/components/guard/AuthGuard";
import { NewTab } from "./NewTab";

export function Component() {
  return (
    <AuthGuard>
      <NewTab></NewTab>
    </AuthGuard>
  );
}
