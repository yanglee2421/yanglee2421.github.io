import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/api/firebase/app";
import { NavMenus } from "@/components/shared/NavMenus";
import { UserProfile } from "@/components/shared/UserProfile";
import { useOutlet } from "react-router-dom";

export function Layout() {
  const [isPending, startTransition] = React.useTransition();
  const outlet = useOutlet();

  return (
    <div className="min-h-dvh">
      <header className="flex items-center px-5 py-2">
        <UserProfile />
        <button
          onClick={() => {
            startTransition(() => signOut(auth));
          }}
          disabled={isPending}
          className="btn-red ms-auto uppercase"
        >
          signout
        </button>
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
