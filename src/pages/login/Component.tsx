import { GuestGuard } from "@/components/guard/GuestGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

import { Login } from "./Login";

export function Component() {
  useHeadTitle("Login");

  return (
    <GuestGuard>
      <Login></Login>
    </GuestGuard>
  );
}
