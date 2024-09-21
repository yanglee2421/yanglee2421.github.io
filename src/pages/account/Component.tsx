import { Account } from "./Account";
import { AuthGuard } from "@/components/guard/AuthGuard";

export function Component() {
  return (
    <AuthGuard>
      <title>Account Settings</title>
      <Account />
    </AuthGuard>
  );
}
