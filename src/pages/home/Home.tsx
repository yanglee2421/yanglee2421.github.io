import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { AsyncStore } from "./AyncStore";
import { Countdown } from "./Countdown";
import { InputNumber } from "./InputNumber";
import { RollCard } from "./RollCard";
import { NavMenus } from "@/components/shared/NavMenus";

export function Home() {
  const [number, setNumber] = React.useState(Number.NaN);
  const [isPending, startTransition] = React.useTransition();
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-dvh flex-col">
      <header>
        {user.photoURL && (
          <figure>
            <img src={user.photoURL} alt="" width={64} height={64} />
            <figcaption>{user.displayName}</figcaption>
          </figure>
        )}
        <button
          onClick={() => {
            startTransition(() => signOut(auth));
          }}
          disabled={isPending}
        >
          signout
        </button>
      </header>
      <main className="flex-auto">
        <aside>
          <NavMenus />
        </aside>
        <AsyncStore />
        <Countdown />
        <RollCard />
        <InputNumber value={number} onChange={setNumber} />
      </main>
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
  );
}

const columns = 12;
const gutter = 20;
const width = 1200;
const perColumnsWidth = (width - (columns - 1) * gutter) / columns;
const c = 4;
const blockWidth = c * perColumnsWidth + (c - 1) * gutter;

function getWidthOfUnknowColumns(c: number) {
  return (width * c) / columns - (columns - c) * (gutter / columns);
}

console.log(blockWidth, Object.is(blockWidth, getWidthOfUnknowColumns(4)));
