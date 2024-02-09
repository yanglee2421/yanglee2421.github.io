// MUI Imports
import { ScrollView } from "@/components";
import { Card, Grid, TextField, CardContent, CardHeader } from "@mui/material";

// React Imports
import React from "react";

// Components Imports
import { SlowRender } from "@/components/shared";

export function EightPanel() {
  const [numberA, setNumberA] = React.useState("");
  const [numberB, setNumberB] = React.useState("");
  const deferredNumberA = React.useDeferredValue(numberA);

  console.log("render");

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TextField
            value={numberA}
            onChange={(evt) => {
              setNumberA(evt.target.value);
              setNumberB(evt.target.value);
            }}
            label="Not Transition"
          ></TextField>
          <TextField
            value={numberA}
            onChange={(evt) => {
              setNumberA(evt.target.value);
              React.startTransition(() => {
                setNumberB(evt.target.value);
              });
            }}
            label="Transition"
          ></TextField>
          <TextField
            value={numberA}
            onChange={(evt) => {
              setNumberA(evt.target.value);
            }}
            label="Deferred value"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Memo b"></CardHeader>
            <CardContent>
              <MemoSlowRenders>{numberB}</MemoSlowRenders>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Memo deferred a"></CardHeader>
            <CardContent>
              <MemoSlowRenders>{deferredNumberA}</MemoSlowRenders>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

const MemoSlowRenders = React.memo(SlowRenders);

function SlowRenders(props: React.PropsWithChildren) {
  return (
    <ScrollView maxHeight={240}>
      <ul>
        {(() => {
          const items: React.ReactNode[] = [];

          for (let i = 0; i < 500; i++) {
            items.push(
              <SlowRender key={i}>
                #{i}/{props.children}
              </SlowRender>
            );
          }

          return items;
        })()}
      </ul>
    </ScrollView>
  );
}
