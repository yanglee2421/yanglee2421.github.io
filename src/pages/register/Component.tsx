import { GuestGuard } from "@/components/guard/GuestGuard";
import { Register } from "./Register";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function Component() {
  useHeadTitle("Register");

  return (
    <GuestGuard>
      <Register></Register>
    </GuestGuard>
  );
}
