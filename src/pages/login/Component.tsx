import { GuestGuard } from "@/components/guard/GuestGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";
import { Login } from "./Login";

export function Component() {
  useHeadTitle("Sign in to Materio");

  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}
