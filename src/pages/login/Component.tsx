import { GuestGuard } from "@/components/guard/GuestGuard";
import { Login } from "./Login";

export function Component() {
  return (
    <GuestGuard>
      <title>Sign in to Materio</title>
      <Login />
    </GuestGuard>
  );
}
