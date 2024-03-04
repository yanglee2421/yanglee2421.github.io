import { AuthGuard } from "@/components/guard/AuthGuard";

import { Blank } from "./Blank";

export function Component() {
  return (
    <AuthGuard>
      <Blank></Blank>
    </AuthGuard>
  );
}
