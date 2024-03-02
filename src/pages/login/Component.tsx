import { GuestGuard } from "@/components/guard/GuestGuard";
import { Login } from "./Login";

export function Component() {
  return (
    <GuestGuard>
      <Login></Login>
    </GuestGuard>
  );
}
