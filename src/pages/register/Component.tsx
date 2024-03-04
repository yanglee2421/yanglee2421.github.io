import { GuestGuard } from "@/components/guard/GuestGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

import { Register } from "./Register";

export function Component() {
  useHeadTitle("Register");

  return (
    <GuestGuard>
      <Register></Register>
    </GuestGuard>
  );
}
