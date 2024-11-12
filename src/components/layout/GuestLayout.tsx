import { useOutlet } from "react-router-dom";
import { GuestGuard } from "../guard/GuestGuard";

export function GuestLayout() {
  const outlet = useOutlet();

  return <GuestGuard>{outlet}</GuestGuard>;
}

export { GuestLayout as Component };
