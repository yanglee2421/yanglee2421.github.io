import { useOutlet } from "react-router-dom";

import { DesktopLayout } from "./DesktopLayout";
import { AuthGuard } from "@/components/guard/AuthGuard";

export function Layout() {
  const outlet = useOutlet();

  return (
    <AuthGuard>
      <DesktopLayout>{outlet}</DesktopLayout>
    </AuthGuard>
  );
}
