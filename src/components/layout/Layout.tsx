import { useOutlet } from "react-router-dom";
import { AuthGuard } from "@/components/guard/AuthGuard";
import { DesktopLayout } from "./DesktopLayout";

export function Layout() {
  const outlet = useOutlet();

  return (
    <AuthGuard>
      <DesktopLayout>{outlet}</DesktopLayout>
    </AuthGuard>
  );
}
