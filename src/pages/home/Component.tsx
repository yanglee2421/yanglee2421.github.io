import { AuthGuard } from "@/components/guard/AuthGuard";
import { Home } from "./Home";

export function Component() {
  return (
    <AuthGuard>
      <title>Firebase React</title>
      <Home />
    </AuthGuard>
  );
}
