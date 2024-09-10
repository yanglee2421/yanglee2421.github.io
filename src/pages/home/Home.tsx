import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { AsyncStore } from "./AyncStore";
import { Countdown } from "./Countdown";
import { InputNumber } from "./InputNumber";
import { RollCard } from "./RollCard";
import { NavMenus } from "@/components/shared/NavMenus";
import { UserProfile } from "@/components/shared/UserProfile";

export function Home() {
  const [number, setNumber] = React.useState(Number.NaN);
  const [isPending, startTransition] = React.useTransition();
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-dvh flex-col">
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
      <main className="flex-auto space-y-6 px-5 py-2">
        <aside>
          <NavMenus />
        </aside>
        <Countdown />
        <RollCard />
        <form action="" className="space-y-3 border px-5 py-2">
          <AsyncStore />
          <InputNumber value={number} onChange={setNumber} />
          <div>
            <label>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
              />
              <span className="ms-2 capitalize">remember me</span>
            </label>
          </div>
          <div className="flex gap-3">
            <label>
              <input
                type="radio"
                name="hale"
                value="hale"
                className="checked:text-red-500 focus:ring-red-500"
              />
              <span className="ms-2">hale</span>
            </label>
            <label>
              <input
                type="radio"
                name="hale"
                value="haloo"
                className="checked:text-blue-500 focus:ring-blue-500"
              />
              <span className="ms-2">haloo</span>
            </label>
          </div>
          <div className="flex gap-3">
            <button className="btn-blue uppercase">submit</button>
            <button className="btn-border uppercase">reset</button>
          </div>
        </form>
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
