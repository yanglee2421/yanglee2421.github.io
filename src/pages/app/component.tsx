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
  GlobalStyles,
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

const Menu = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        inlineSize: "100%",
        blockSize: "100%",

        overflowY: "auto",
        scrollbarColor: `${theme.palette.divider} transparent`,
      }}
    >
      <NavMenu />
    </Box>
  );
};

const Content = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowX: "auto",
        overflowY: "auto",
        scrollbarColor: `${theme.palette.divider} transparent`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ padding: 3 }}>
        <div>
          <DateTimePicker />
        </div>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quam
          aperiam doloribus vero accusamus tempora. Nesciunt similique error
          aspernatur, repudiandae id voluptatibus quod eligendi minima
          laudantium consequatur nostrum molestiae totam! Consequatur iure
          perspiciatis autem in nesciunt! Debitis inventore pariatur cupiditate
          accusamus illum excepturi quas recusandae dolorum repellat voluptatum
          amet facilis aliquam odit aspernatur maiores, mollitia molestias, quam
          harum unde praesentium. Eos corrupti soluta nam adipisci. Dolore
          laboriosam necessitatibus earum molestias asperiores esse debitis
          cumque alias deleniti beatae sapiente eos itaque sequi, rerum et
          impedit, deserunt nobis, iure ipsa est! Officiis. Dolorem deleniti ex
          blanditiis in ducimus! Maiores debitis nihil explicabo, consequuntur
          aperiam quod perferendis assumenda quasi suscipit fuga delectus
          similique dignissimos, cumque expedita. Vero dolor, maiores quisquam
          reiciendis doloribus consectetur. Delectus atque architecto ea nisi
          quaerat unde quod soluta aliquam? Ipsum, voluptate ab repellendus modi
          asperiores quo nobis repellat quod beatae alias nesciunt temporibus
          non iusto? Harum magni eos cum. Odit quam itaque saepe, ipsam mollitia
          cupiditate illo porro, similique qui tempora minima ad obcaecati
          incidunt. Distinctio perspiciatis quia, iure nisi harum ut quo
          quisquam ipsum ipsam? Incidunt, repellendus voluptatem. Dolorem
          incidunt reprehenderit consequuntur tempore in alias molestiae beatae
          esse unde ab? Nemo iure officiis labore possimus neque facilis modi,
          iusto assumenda sit soluta. Omnis consequuntur expedita aliquam nulla
          eum. Accusantium quis minima, quidem voluptatum sequi placeat modi
          doloribus adipisci ipsum quos pariatur similique amet itaque dolor
          ipsa minus numquam reiciendis id qui officia, vel excepturi?
          Repellendus harum ducimus delectus! At, error! Iste soluta, aut alias
          reprehenderit officiis praesentium ab ipsam asperiores. Perferendis
          consequatur, facere, enim error fuga fugiat recusandae nisi neque
          assumenda omnis voluptates optio facilis aut dolorem sequi? Vitae eum
          reiciendis nobis ipsum saepe officiis atque eius maiores aliquam?
          Cumque, unde neque suscipit quasi officia fuga, iusto asperiores eos
          ea facere, nihil ducimus! Voluptatum, tenetur aspernatur? Expedita,
          officia.
        </span>
        <Box width={2000} height={2000}></Box>
      </Box>
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

  const handleAlwaysOnTopToggle = () => setAlwaysOnTop((prev) => !prev);
  const handleMenuToggle = () => {
    setOpenMenu((prev) => !prev);
    setLastActivePanel((prev) => (prev === "menu" ? "content" : "menu"));
  };
  const handleChatToggle = () => {
    setOpenChat((prev) => !prev);
    setLastActivePanel((prev) => (prev === "chat" ? "content" : "chat"));
  };

  const renderPanelInSmallScreen = () => {
    switch (lastActivePanel) {
      case "menu":
        return (
          <Panel id="menu" order={1}>
            <Menu />
          </Panel>
        );
      case "chat":
        return (
          <Panel id="chat" order={3}>
            <CopilotChat />
          </Panel>
        );
      case "content":
      default:
        return (
          <Panel id="content" order={2}>
            <Content />
          </Panel>
        );
    }
  };

  const renderPanel = () => {
    if (isSmallScreen) {
      return renderPanelInSmallScreen();
    }

    return (
      <>
        {openMenu && (
          <>
            <Panel minSize={16} defaultSize={25} id="menu" order={1}>
              <Menu />
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
          <Content />
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
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        position: "relative",
        zIndex: 10,

        blockSize: "100%",
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
      <Box sx={{ flex: 1, minBlockSize: 0 }}>
        <PanelGroup direction="horizontal" autoSaveId="resize">
          {renderPanel()}
        </PanelGroup>
      </Box>
      <GlobalStyles
        styles={{
          ":root,body,#root": {
            blockSize: "100%",
          },
        }}
      />
    </Box>
  );
};
