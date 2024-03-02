import { GuestGuard } from "@/components/guard/GuestGuard";
import { Login } from "./Login";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function Component() {
  useHeadTitle("Login");

  return (
    <GuestGuard>
      <Login></Login>
    </GuestGuard>
  );
}
