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
    <div className="relative flex min-h-dvh flex-col">
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
      <div className="flex flex-auto gap-3 px-5 py-6">
        <aside className="w-64">
          <NavMenus />
        </aside>
        <div className="min-w-0 flex-1">
          <main>{outlet}</main>
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
