import React from "react";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { AsyncStore } from "./AyncStore";
import { Countdown } from "./Countdown";
import { InputNumber } from "./InputNumber";
import { RollCard } from "./RollCard";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function Home() {
  const [number, setNumber] = React.useState(Number.NaN);
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <>
      <Countdown />
      <RollCard />
      <Card>
        <form action="" className="space-y-3 p-4">
          <AsyncStore />
          <InputNumber value={number} onChange={setNumber} />
          <RadioGroup>
            <div>
              <label>
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
                />
                <span className="ms-2 capitalize">remember me</span>
              </label>
            </div>
            <div className="flex gap-3 *:flex *:items-center *:gap-2">
              <div>
                <RadioGroupItem value="1" />
                <Label>hale</Label>
              </div>
              <div>
                <RadioGroupItem value="2" />
                <Label>haloo</Label>
              </div>
            </div>
          </RadioGroup>

          <div className="flex gap-3">
            <Button type="submit" className="uppercase">
              submit
            </Button>
            <Button type="reset" variant={"outline"} className="uppercase">
              reset
            </Button>
          </div>
        </form>
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
