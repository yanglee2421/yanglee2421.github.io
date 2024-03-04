import { AuthGuard } from "@/components/guard/AuthGuard";

import { Charts } from "./Charts";

export function Component() {
  return (
    <AuthGuard>
      <Charts></Charts>
    </AuthGuard>
  );
}
