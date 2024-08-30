import React from "react";
import bgImg from "@/assets/images/justHer.jpg";
import { AsyncStore } from "./AyncStore";
import { Calendar } from "./Calendar";
import { Countdown } from "./Countdown";
import { InputNumber } from "./InputNumber";
import { RollCard } from "./RollCard";
import { TipTap } from "./TipTap";

export function Home() {
  const [number, setNumber] = React.useState(Number.NaN);

  const [html, setHtml] = React.useState("<p>hello world</p>");

  return (
    <>
      <img src={bgImgHref} width={192} height={108} />
      <AsyncStore />
      <Calendar />
      <Countdown />
      <TipTap value={html} onChange={setHtml} />
      <RollCard />
      <InputNumber value={number} onChange={setNumber} />
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
