import {
  MenuOutlined,
  PushPin,
  PushPinOutlined,
  SearchOutlined,
  SmartToyOutlined,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { PanelResizeHandle, PanelGroup, Panel } from "react-resizable-panels";
import { DateTimePicker } from "@mui/x-date-pickers";
import { CopilotChat } from "@/components/chat";
import { NavMenu } from "@/router/nav";
import { ScrollView } from "@/components/scrollbar";

const Content = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <div>
        <DateTimePicker />
      </div>
      <iframe src="https://bilibili.com" width={700} height={700}></iframe>
      <Box width={2000} height={2000}></Box>
    </Box>
  );
};

type ActivePanel = "menu" | "chat" | "content";

export const Component = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);
  const [alwaysOnTop, setAlwaysOnTop] = React.useState(false);
  const [leftResizeActive, setLeftResizeActive] = React.useState(false);
  const [rightResizeActive, setRightResizeActive] = React.useState(false);
  const [lastActivePanel, setLastActivePanel] =
    React.useState<ActivePanel>("content");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const getShowMenu = () => {
    if (!isSmallScreen) {
      return openMenu;
    }

    return lastActivePanel === "menu";
  };

  const getShowChat = () => {
    if (!isSmallScreen) {
      return openChat;
    }

    return lastActivePanel === "chat";
  };

  const getShowContent = () => {
    if (!isSmallScreen) {
      return true;
    }

    return lastActivePanel === "content";
  };

  const getDisableYScroll = () => {
    if (isSmallScreen) {
      return showChat;
    }

    return true;
  };

  const showMenu = getShowMenu();
  const showChat = getShowChat();
  const showContent = getShowContent();
  const disableYScroll = getDisableYScroll();

  const handleAlwaysOnTopToggle = () => setAlwaysOnTop((prev) => !prev);
  const handleMenuToggle = () => {
    setOpenMenu((prev) => !prev);
    setLastActivePanel((prev) => (prev === "menu" ? "content" : "menu"));
  };
  const handleChatToggle = () => {
    setOpenChat((prev) => !prev);
    setLastActivePanel((prev) => (prev === "chat" ? "content" : "chat"));
  };

  return (
    <Box
      sx={{
        blockSize: "100dvh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          borderBlockEnd: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          backdropFilter: "blur(8px)",

          padding: 2,

          position: "fixed",
          zIndex: theme.zIndex.appBar,
          inlineSize: "100%",
        }}
      >
        <Box>
          <IconButton onClick={handleMenuToggle}>
            <MenuOutlined />
          </IconButton>
        </Box>
        <Box>
          <TextField
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box>
          <IconButton onClick={handleAlwaysOnTopToggle}>
            {alwaysOnTop ? <PushPin /> : <PushPinOutlined />}
          </IconButton>
          <IconButton onClick={handleChatToggle}>
            <SmartToyOutlined />
          </IconButton>
        </Box>
      </Box>
      <ScrollView
        slotProps={
          disableYScroll
            ? {
                viewport: {
                  sx: {
                    "&>div[style]": {
                      display: "block !important",
                      blockSize: "100%",
                    },
                  },
                },
              }
            : void 0
        }
      >
        <Box
          sx={{
            paddingBlockStart: "57px",
            blockSize: "100%",
          }}
        >
          <PanelGroup direction="horizontal" autoSaveId="resize">
            <Panel
              minSize={16}
              defaultSize={25}
              id="menu"
              order={1}
              style={{
                display: showMenu ? "block" : "none",
              }}
            >
              <ScrollView>
                <NavMenu />
              </ScrollView>
            </Panel>
            <PanelResizeHandle
              style={{
                width: leftResizeActive ? 2 : 1,
                backgroundColor: leftResizeActive
                  ? theme.palette.primary.main
                  : theme.palette.divider,
                display: showMenu ? "block" : "none",
              }}
              onDragging={setLeftResizeActive}
            />
            <Panel
              id="content"
              order={2}
              style={{ display: showContent ? "block" : "none" }}
            >
              <Box sx={{ inlineSize: "100%", blockSize: "100%" }}>
                <ScrollView>
                  <Content />
                </ScrollView>
              </Box>
            </Panel>
            <PanelResizeHandle
              style={{
                width: rightResizeActive ? 2 : 1,
                backgroundColor: rightResizeActive
                  ? theme.palette.primary.main
                  : theme.palette.divider,
                display: showChat ? "block" : "none",
              }}
              onDragging={setRightResizeActive}
            />
            <Panel
              minSize={20}
              defaultSize={30}
              id="chat"
              order={3}
              style={{
                display: showChat ? "block" : "none",
              }}
            >
              <CopilotChat />
            </Panel>
          </PanelGroup>
        </Box>
      </ScrollView>
    </Box>
  );
};
