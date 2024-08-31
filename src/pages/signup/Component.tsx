import { GuestGuard } from "@/components/guard/GuestGuard";
import { SignUp } from "./SignUp";

export function Component() {
  return (
    <GuestGuard>
      <title>Join Materio</title>
      <SignUp />
    </GuestGuard>
  );
}
