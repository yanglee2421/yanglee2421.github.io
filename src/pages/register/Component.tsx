import { GuestGuard } from "@/components/guard/GuestGuard";
import { Register } from "./Register";

export function Component() {
  return (
    <GuestGuard>
      <Register></Register>
    </GuestGuard>
  );
}
