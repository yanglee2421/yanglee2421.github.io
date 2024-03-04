import { GuestGuard } from "@/components/guard/GuestGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";
import { ForgotPassword } from "./ForgotPassword";

export function Component() {
  useHeadTitle("Forgot Password");

  return (
    <GuestGuard>
      <ForgotPassword></ForgotPassword>
    </GuestGuard>
  );
}
