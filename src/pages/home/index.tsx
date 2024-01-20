// MUI Imports
import { Box, Select, MenuItem, Fade, Tab, Tabs } from "@mui/material";
import { Microsoft, Apple, YouTube, Instagram } from "@mui/icons-material";

// Components Imports
import { CardRadio } from "./card-radio";
import { FiveForm } from "./FiveForm";
import { QueryBoard } from "./QueryBoard";
import { SwitchTransition } from "react-transition-group";
import { SevenForm } from "./SevenForm";
import { TabLabel } from "./TabLabel";

// React Imports
import React from "react";

export function Component() {
  const [tab, setTab] = React.useState("1");
  const [selected, setSelected] = React.useState("five");

  return (
    <>
      <Box>
        <CardRadio></CardRadio>
      </Box>

      <Box display={"flex"} gap={5}>
        <Box
          flex={1}
          overflow={"hidden"}
          display={"flex"}
          alignItems={"center"}
          paddingBlock={3}
        >
          <Tabs
            value={tab}
            onChange={(evt, v) => {
              void evt;
              React.startTransition(() => {
                setTab(v);
              });
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ alignItems: "center" }}
          >
            <Tab
              value="1"
              label={<TabLabel icon={<Microsoft></Microsoft>}>five</TabLabel>}
            ></Tab>
            <Tab
              value="2"
              label={<TabLabel icon={<Apple></Apple>}>Query Board</TabLabel>}
            ></Tab>
            <Tab
              value="3"
              label={<TabLabel icon={<YouTube></YouTube>}>seven</TabLabel>}
            ></Tab>
            <Tab
              value="4"
              label={<TabLabel icon={<Instagram></Instagram>}>eight</TabLabel>}
            ></Tab>
          </Tabs>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Select
            value={selected}
            onChange={(evt) => {
              setSelected(String(evt.target.value));
            }}
            size="small"
          >
            <MenuItem value="five">woolworlds five</MenuItem>
            <MenuItem value="two">woolworlds two</MenuItem>
          </Select>
        </Box>
      </Box>

      <SwitchTransition>
        <Fade key={tab} unmountOnExit>
          <Box>
            {(() => {
              switch (tab) {
                case "1":
                  return <FiveForm></FiveForm>;
                case "2":
                  return <QueryBoard></QueryBoard>;
                case "3":
                  return <SevenForm></SevenForm>;
                case "4":
                default:
                  return null;
              }
            })()}
          </Box>
        </Fade>
      </SwitchTransition>
    </>
  );
}
