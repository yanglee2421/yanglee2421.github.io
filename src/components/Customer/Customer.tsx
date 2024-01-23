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
  Collapse,
  FormLabel,
  FormControl,
} from "@mui/material";
import {
  CloseOutlined,
  DownloadOutlined,
  SettingsOutlined,
  AddOutlined,
  RemoveOutlined,
} from "@mui/icons-material";

// React Imports
import React from "react";

// Components Imports
import { ScrollView } from "@/components";

// Store Imports
import { useThemeStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";

// Utils Imports
import {
  useForageFileMutation,
  useForageFileQuery,
} from "@/hooks/api-localforage";
import { useResize } from "./useResize";
import snowVillage from "@/assets/images/snow-village.jpg";
import { useImmer } from "use-immer";

export function Customer() {
  const query = useForageFileQuery("bg-img");
  const mutation = useForageFileMutation();
  const [setting, updateSetting] = useImmer({
    showDrawer: false,
    wallpaperCollapsed: false,
  });

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

  const imgBoxRef = React.useRef<HTMLLabelElement>(null);
  const imageSize = useResize(imgBoxRef);

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

  const handleBgImgChange: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >["onChange"] = async (evt) => {
    const file = evt.target.files?.item(0);

    if (file) {
      mutation.mutate({ file, fileKey: "bg-img" });
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
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          color: "common.white",
          bgcolor: "action.active",
        }}
      >
        <SettingsOutlined color="inherit"></SettingsOutlined>
      </IconButton>
      <SwipeableDrawer
        open={setting.showDrawer}
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
              <Box p={3} bgcolor={(theme) => theme.palette.background.default}>
                <Stack spacing={3}>
                  <Card>
                    <CardHeader
                      title={<Typography variant="h6">Wallpaper</Typography>}
                      subheader={
                        <Typography variant="subtitle2" color="action.active">
                          These settings are saved locally on your
                        </Typography>
                      }
                      action={
                        <IconButton
                          onClick={() => {
                            updateSetting((prev) => {
                              prev.wallpaperCollapsed =
                                !prev.wallpaperCollapsed;
                            });
                          }}
                        >
                          {setting.wallpaperCollapsed ? (
                            <AddOutlined></AddOutlined>
                          ) : (
                            <RemoveOutlined></RemoveOutlined>
                          )}
                        </IconButton>
                      }
                    ></CardHeader>
                    <Collapse in={!setting.wallpaperCollapsed}>
                      <CardContent>
                        <CardActionArea
                          ref={imgBoxRef}
                          component="label"
                          title="click to change image"
                          sx={{
                            color: "common.white",
                            aspectRatio: "16/9",
                          }}
                        >
                          {(() => {
                            // API pending
                            if (query.isPending) {
                              return (
                                <StyledImg
                                  src={snowVillage}
                                  alt="Background image preview"
                                  width={imageSize.width}
                                  height={imageSize.height}
                                ></StyledImg>
                              );
                            }

                            // API failed
                            if (query.isError) {
                              return (
                                <StyledImg
                                  src={snowVillage}
                                  alt={query.error.message}
                                  width={imageSize.width}
                                  height={imageSize.height}
                                ></StyledImg>
                              );
                            }

                            // API success
                            if (query.isSuccess) {
                              return (
                                <StyledImg
                                  src={query.data.src}
                                  alt={query.data.filename}
                                  onError={() => {
                                    query.refetch();
                                  }}
                                  width={imageSize.width}
                                  height={imageSize.height}
                                ></StyledImg>
                              );
                            }
                          })()}
                          <input
                            value={""}
                            onChange={handleBgImgChange}
                            type="file"
                            accept="image/*"
                            hidden
                          />
                        </CardActionArea>
                      </CardContent>
                      <CardContent>
                        <FormControl fullWidth>
                          <FormLabel>
                            <Typography variant="overline">
                              Background alpha
                            </Typography>
                          </FormLabel>
                          <Slider
                            value={themeStore.bgAlpha}
                            onChange={handleBgAlphaChange}
                            valueLabelDisplay="auto"
                          ></Slider>
                        </FormControl>
                        <FormControl fullWidth>
                          <FormLabel>
                            <Typography variant="overline">
                              Background blur
                            </Typography>
                          </FormLabel>
                          <Slider
                            value={themeStore.bgBlur}
                            onChange={handleBgBlurChange}
                            valueLabelDisplay="auto"
                          ></Slider>
                        </FormControl>
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
                    </Collapse>
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
