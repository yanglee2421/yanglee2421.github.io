import { GuestGuard } from "@/components/guard/GuestGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

import { SignUp } from "./SignUp";

export function Component() {
  useHeadTitle("Join Materio");

  return (
    <GuestGuard>
      <SignUp></SignUp>
    </GuestGuard>
  );
}
