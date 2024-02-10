// MUI Imports
import { Card, CardContent, CardProps, Grid, RadioGroup } from "@mui/material";

// React Imports
import React from "react";

// Components Imports
import { RadioItem } from "./radio-item";

export function CardRadio(props: CardProps) {
  const [value, setValue] = React.useState("one");

  return (
    <Card {...props}>
      <CardContent>
        <RadioGroup
          value={value}
          onChange={(evt, v) => {
            void evt;
            setValue(v);
          }}
        >
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <RadioItem
                title="Visual Search"
                desc="lorem "
                value="one"
                checked={value === "one"}
                name="Kent Dodds"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <RadioItem
                title="Visual Search"
                desc="lorem "
                value="two"
                checked={value === "two"}
                name="Jed Watson"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <RadioItem
                title="Visual Search"
                desc="lorem "
                value="three"
                checked={value === "three"}
                name="Tim Neutkens"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <RadioItem
                title="Visual Search"
                desc="lorem "
                value="four"
                checked={value === "four"}
                name="Yang Lee"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
