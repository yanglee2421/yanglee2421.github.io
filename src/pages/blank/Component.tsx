import { Blank } from "./Blank";
import { AuthGuard } from "@/components/guard/AuthGuard";

export function Component() {
  return (
    <AuthGuard>
      <Blank></Blank>
    </AuthGuard>
  );
}
