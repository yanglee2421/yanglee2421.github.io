import { FormatQuote, Photo } from "@mui/icons-material";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import React from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router";

const calcPath = (tab: string) => {
  switch (tab) {
    case "quotes":
      return "/quotes";
    case "background":
    default:
      return "/";
  }
};

export const MuiLayout = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = React.useState("background");
  const navigate = useNavigate();
  const [, startTransition] = React.useTransition();

  React.useEffect(() => {
    startTransition(() => {
      navigate(calcPath(activeTab));
    });
  }, [activeTab]);

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={(_, val) => {
          setActiveTab(val);
        }}
      >
        <Tab
          icon={<Photo />}
          iconPosition="start"
          label="背景"
          value={"background"}
          sx={{ minHeight: 48 }}
        />
        <Tab
          icon={<FormatQuote />}
          iconPosition="start"
          label="每日一言"
          value={"quotes"}
          sx={{ minHeight: 48 }}
        />
      </Tabs>
      <Box sx={{ padding: 1.5 }}>
        <Outlet />
      </Box>
      <ScrollRestoration />
    </>
  );
};
