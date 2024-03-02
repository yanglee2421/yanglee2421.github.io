import { GuestGuard } from "@/components/guard/GuestGuard";
import { ForgotPassword } from "./ForgotPassword";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function Component() {
  useHeadTitle("Forgot Password");

  return (
    <GuestGuard>
      <ForgotPassword></ForgotPassword>
    </GuestGuard>
  );
}
