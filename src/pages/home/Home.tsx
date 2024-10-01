import React from "react";
import { AsyncStore } from "./AyncStore";
import { Countdown } from "./Countdown";
import { InputNumber } from "./InputNumber";
import { RollCard } from "./RollCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  useThemeStore,
  useThemeStoreHasHydrated,
} from "@/hooks/store/useThemeStore";

export function Home() {
  const [number, setNumber] = React.useState(Number.NaN);
  const hasHydrated = useThemeStoreHasHydrated();
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const label1 = React.useId();
  const label2 = React.useId();
  const label3 = React.useId();

  if (!hasHydrated) {
    return <p className="animate-pulse px-5 py-2 text-center">loading</p>;
  }

  return (
    <>
      <Countdown />
      <RollCard />
      <Card className="space-y-6 p-4">
        <AsyncStore />
        <InputNumber value={number} onChange={setNumber} />
        <RadioGroup
          value={mode}
          onValueChange={(evt) => {
            switch (evt) {
              case "system":
              case "light":
              case "dark":
                setMode(evt);
                break;
            }
          }}
          className="flex items-center gap-3 *:flex *:items-center *:gap-2 *:uppercase"
        >
          <div>
            <RadioGroupItem id={label1} value="system" />
            <Label htmlFor={label1}>system</Label>
          </div>
          <div>
            <RadioGroupItem id={label2} value="light" />
            <Label htmlFor={label2}>light</Label>
          </div>
          <div>
            <RadioGroupItem id={label3} value="dark" />
            <Label htmlFor={label3}>dark</Label>
          </div>
        </RadioGroup>
      </Card>
    </>
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
