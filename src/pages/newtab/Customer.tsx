import { CloseOutlined, SettingsOutlined } from "@mui/icons-material";
import {
  IconButton,
  SwipeableDrawer,
  Box,
  useMediaQuery,
  Divider,
  Stack,
} from "@mui/material";
import ReactDOM from "react-dom";
import { useImmer } from "use-immer";
import { ScrollView } from "@/components/ui/ScrollView";
import { ModeCard } from "./ModeCard";
import { RestoreCard } from "./RestoreCard";
import { WallpaperCard } from "./WallpaperCard";
import type { Theme } from "@mui/material";

export function Customer() {
  const smallScreen = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.up("sm");
  });

  const [setting, updateSetting] = useImmer({
    showDrawer: false,
  });

  const handleDrawerClose = () => {
    updateSetting((prev) => {
      prev.showDrawer = false;
    });
  };

  const handleDrawerOpen = () => {
    updateSetting((prev) => {
      prev.showDrawer = true;
    });
  };

  return (
    <>
      <IconButton onClick={handleDrawerOpen}>
        <SettingsOutlined />
      </IconButton>
      {ReactDOM.createPortal(
        <SwipeableDrawer
          open={setting.showDrawer}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerClose}
          anchor={smallScreen ? "right" : "top"}
          hideBackdrop
          variant="persistent"
          sx={{
            "& > .MuiPaper-root": {
              height: "100%",
            },
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={{ sm: 400 }}
            height={"100%"}
          >
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                p: 2,
              }}
            >
              <IconButton onClick={handleDrawerClose}>
                <CloseOutlined />
              </IconButton>
            </Stack>
            <Divider />
            <ScrollView>
              <Box
                p={3}
                bgcolor={(theme) => {
                  return theme.palette.background.default;
                }}
              >
                <Stack spacing={6}>
                  <WallpaperCard />
                  <ModeCard />
                  <RestoreCard />
                </Stack>
              </Box>
            </ScrollView>
          </Box>
        </SwipeableDrawer>,
        document.body,
      )}
    </>
  );
}
