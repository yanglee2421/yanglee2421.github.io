import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "@/api/firebase/app";
import bgImg from "@/assets/images/justHer.jpg";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { AsyncStore } from "./AyncStore";
import { Calendar } from "./Calendar";
import { Countdown } from "./Countdown";
import { InputNumber } from "./InputNumber";
import { RollCard } from "./RollCard";
import { TipTap } from "./TipTap";

export function Home() {
  const [number, setNumber] = React.useState(Number.NaN);
  const [html, setHtml] = React.useState("<p>hello world</p>");
  const [isPending, startTransition] = React.useTransition();
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <>
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
      <aside>
        <nav>
          <ul>
            <li>
              <NavLink to={{ pathname: "/account" }}>account</NavLink>
            </li>
            <li>
              <NavLink to={{ pathname: "/table" }}>table</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <img src={bgImgHref} width={192} height={108} />
        <Calendar />
        <TipTap value={html} onChange={setHtml} />
        <hr />
        <AsyncStore />
        <Countdown />
        <RollCard />
        <InputNumber value={number} onChange={setNumber} />
      </main>
      <footer>
        &copy;2024 <a href="https://github.com/yanglee2421">yanglee2421</a>
      </footer>
    </>
  );
}

const bgImgHref = new URL(bgImg, import.meta.url).href;

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
