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
import { NavMenu } from "@/components/nav";
import { ScrollView } from "@/components/scrollbar";

type ContentProps = {
  ref?: React.Ref<HTMLDivElement>;
};

const Content = ({ ref }: ContentProps) => {
  return (
    <div ref={ref}>
      <ScrollView>
        <Box sx={{ padding: 4 }}>
          <div>
            <DateTimePicker />
          </div>
          <iframe src="https://bilibili.com" width={700} height={700}></iframe>
          <Box width={2000} height={2000}></Box>
        </Box>
      </ScrollView>
    </div>
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

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAlwaysOnTopToggle = () => setAlwaysOnTop((prev) => !prev);
  const handleMenuToggle = () => {
    setOpenMenu((prev) => !prev);
    setLastActivePanel((prev) => (prev === "menu" ? "content" : "menu"));
  };
  const handleChatToggle = () => {
    setOpenChat((prev) => !prev);
    setLastActivePanel((prev) => (prev === "chat" ? "content" : "chat"));
  };

  React.useEffect(() => {
    let timer = 0;
    const fn = () => {
      timer = requestAnimationFrame(fn);
      const cursor = cursorRef.current;
      const frame = frameRef.current!;
      const content = contentRef.current!;

      if (!cursor) {
        frame.style.display = "none";
        return;
      }

      content.style.width = cursor.getBoundingClientRect().width + "px";
      content.style.height = cursor.getBoundingClientRect().height + "px";
      frame.style.display = "block";
      frame.style.left = cursor.getBoundingClientRect().left + "px";
      frame.style.top = cursor.getBoundingClientRect().top + "px";
    };

    fn();

    return () => {
      cancelAnimationFrame(timer);
    };
  }, []);

  const renderPanelInSmallScreen = () => {
    switch (lastActivePanel) {
      case "menu":
        return <NavMenu />;
      case "chat":
        return <CopilotChat />;
      case "content":
      default:
        return (
          <Box
            ref={cursorRef}
            sx={{ inlineSize: "100%", blockSize: "100%" }}
          ></Box>
        );
    }
  };

  const renderPanel = () => {
    if (isSmallScreen) {
      return renderPanelInSmallScreen();
    }

    return (
      <PanelGroup direction="horizontal" autoSaveId="resize">
        {openMenu && (
          <>
            <Panel minSize={16} defaultSize={25} id="menu" order={1}>
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
              }}
              onDragging={setLeftResizeActive}
            />
          </>
        )}
        <Panel id="content" order={2}>
          <Box
            ref={cursorRef}
            sx={{ inlineSize: "100%", blockSize: "100%" }}
          ></Box>
        </Panel>
        {openChat && (
          <>
            <PanelResizeHandle
              style={{
                width: rightResizeActive ? 2 : 1,
                backgroundColor: rightResizeActive
                  ? theme.palette.primary.main
                  : theme.palette.divider,
              }}
              onDragging={setRightResizeActive}
            />
            <Panel minSize={20} defaultSize={30} id="chat" order={3}>
              <CopilotChat />
            </Panel>
          </>
        )}
      </PanelGroup>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        position: "relative",
        zIndex: 10,

        blockSize: "100dvh",
      }}
    >
      <Box
        ref={frameRef}
        sx={{
          position: "fixed",
          zIndex: 10,
          inlineSize: "100%",
          blockSize: 0,
        }}
      >
        <Content ref={contentRef} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          borderBlockEnd: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          backdropFilter: "blur(8px)",

          padding: 2,
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
      <Box sx={{ flex: 1, minBlockSize: 0 }}>{renderPanel()}</Box>
    </Box>
  );
};
