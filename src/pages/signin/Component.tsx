import { GuestGuard } from "@/components/guard/GuestGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

import { SignIn } from "./SignIn";

export function Component() {
  useHeadTitle("Sign in to Materio");

  return (
    <GuestGuard>
      <SignIn></SignIn>
    </GuestGuard>
  );
}
