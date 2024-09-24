import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/api/firebase/app";
import { NavMenus } from "@/components/shared/NavMenus";
import { UserProfile } from "@/components/shared/UserProfile";
import { useOutlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Layout() {
  const [isPending, startTransition] = React.useTransition();
  const outlet = useOutlet();

  return (
    <div className="min-h-dvh">
      <header className="flex items-center px-5 py-2">
        <UserProfile />
        <Button
          onClick={() => {
            startTransition(() => signOut(auth));
          }}
          disabled={isPending}
          variant={"destructive"}
          size={"sm"}
          className="ms-auto uppercase"
        >
          signout
        </Button>
      </header>
      <div>
        <aside className="px-5 py-2">
          <NavMenus />
        </aside>
        <div>
          <main className="space-y-6 px-5 py-2">{outlet}</main>
          <footer className="px-5 py-2">
            &copy;2024{" "}
            <a
              href="https://github.com/yanglee2421"
              className="text-blue-500 hover:underline"
            >
              yanglee2421
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
