// MUI Imports
import {
  IconButton,
  SwipeableDrawer,
  Box,
  useMediaQuery,
  Theme,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Typography,
  styled,
  CardActionArea,
  Stack,
  CardActions,
  Button,
  Slider,
  SliderProps,
} from "@mui/material";
import {
  CloseOutlined,
  DownloadOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

// React Imports
import React from "react";

// Components Imports
import { ScrollView } from "@/components";

// Store Imports
import { useThemeStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";

// Utils Imports
import { useForageFileQuery } from "@/hooks/api-localforage";
import { useResize } from "./useResize";
import snowVillage from "@/assets/images/snow-village.jpg";

export function Customer() {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const isExtraSmall = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.down("sm");
  });

  const themeStore = useThemeStore(
    useShallow((store) => {
      return {
        bgAlpha: store.bgAlpha,
        setBgAlpha: store.setBgAlpha,
        bgBlur: store.bgBlur,
        setBgBlur: store.setBgBlur,
      };
    })
  );

  const query = useForageFileQuery("bg-img");
  const imgBoxRef = React.useRef<HTMLLabelElement>(null);
  const imageSize = useResize(imgBoxRef);

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };

  const handleDrawerOpen = () => {
    setShowDrawer(true);
  };

  const handleBgImgChange: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >["onChange"] = async (evt) => {
    const file = evt.target.files?.[0];

    if (file) {
    }
  };

  const handleBgAlphaChange: SliderProps["onChange"] = (evt, v) => {
    void evt;

    if (typeof v === "number") {
      themeStore.setBgAlpha(v);
    }
  };

  const handleBgBlurChange: SliderProps["onChange"] = (evt, v) => {
    void evt;

    if (typeof v === "number") {
      themeStore.setBgBlur(v);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleDrawerOpen}
        color="inherit"
        sx={{ position: "absolute", top: "1rem", right: "1rem" }}
      >
        <SettingsOutlined></SettingsOutlined>
      </IconButton>
      <SwipeableDrawer
        open={showDrawer}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
        anchor={isExtraSmall ? "top" : "right"}
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
          <Box p={2}>
            <IconButton onClick={handleDrawerClose}>
              <CloseOutlined></CloseOutlined>
            </IconButton>
          </Box>
          <Divider></Divider>
          <Box flex={1} overflow={"hidden"}>
            <ScrollView>
              <Box p={4} bgcolor={(theme) => theme.palette.background.default}>
                <Stack spacing={6}>
                  <Card>
                    <CardHeader
                      title={<Typography variant="h6">Wallpaper</Typography>}
                    ></CardHeader>
                    <CardContent>
                      <CardActionArea
                        ref={imgBoxRef}
                        component="label"
                        title="click to change image"
                        sx={{
                          color: "common.white",

                          aspectRatio: "16/9",
                          overflow: "hidden",
                        }}
                      >
                        <StyledImg
                          src={query.data?.src || snowVillage}
                          alt="Background image preview"
                          width={imageSize.width}
                          height={imageSize.height}
                        ></StyledImg>
                        <input
                          value={""}
                          onChange={handleBgImgChange}
                          type="file"
                          hidden
                        />
                      </CardActionArea>
                    </CardContent>
                    <CardContent>
                      <Slider
                        value={themeStore.bgAlpha}
                        onChange={handleBgAlphaChange}
                        valueLabelDisplay="auto"
                      />
                      <Slider
                        value={themeStore.bgBlur}
                        onChange={handleBgBlurChange}
                        valueLabelDisplay="auto"
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        LinkComponent={"a"}
                        href={query.data?.src || snowVillage}
                        download={query.data?.filename}
                        title="download image"
                        startIcon={
                          <DownloadOutlined fontSize="small"></DownloadOutlined>
                        }
                        sx={{ textTransform: "lowercase" }}
                      >
                        download
                      </Button>
                    </CardActions>
                  </Card>
                  <Card>
                    <CardContent></CardContent>
                  </Card>
                </Stack>
                <Box height={1000}>465464161</Box>
              </Box>
            </ScrollView>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

const StyledImg = styled("img")({
  objectFit: "cover",
  verticalAlign: "bottom",
});
