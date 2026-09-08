import { Tab, Tabs, useTheme } from "@mui/material";
import React from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router";

export const MuiLayout = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = React.useState("background");
  const navigate = useNavigate();
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {}, [activeTab]);

  React.useEffect(() => {}, [isPending]);

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={(_, val) => {
          setActiveTab(val);
        }}
      >
        <Tab label="背景" value={"background"} />
        <Tab label="每日一言" />
      </Tabs>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
