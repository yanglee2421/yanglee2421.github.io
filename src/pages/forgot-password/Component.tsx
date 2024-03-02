import { GuestGuard } from "@/components/guard/GuestGuard";
import { ForgotPassword } from "./ForgotPassword";

export function Component() {
  return (
    <GuestGuard>
      <ForgotPassword></ForgotPassword>
    </GuestGuard>
  );
}
