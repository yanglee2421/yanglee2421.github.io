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
import { Close, Download, Menu } from "@mui/icons-material";

// React Imports
import React from "react";

// Components Imports
import { ScrollView } from "@/components";

// Query Imports
import { useBgImgMutation, useBgImgQuery } from "@/hooks/api-localforage";

// Redux Imports
import localforage from "localforage";

export function BlankMenu() {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const isExtraSmall = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.down("sm");
  });

  // Query Hooks
  const bgImgQuery = useBgImgQuery();
  const bgImgMutation = useBgImgMutation();

  const bgAlpha = 0;
  const bgBlur = 0;

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };

  const handleDrawerOpen = () => {
    setShowDrawer(true);
  };

  const handleBgImgChange: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >["onChange"] = (evt) => {
    const file = evt.target.files?.[0];

    if (file) {
      bgImgMutation.mutate(file);
    }
  };

  const handleBgAlphaChange: SliderProps["onChange"] = (evt, v) => {
    void evt;

    if (typeof v === "number") {
    }
  };

  const handleBgBlurChange: SliderProps["onChange"] = (evt, v) => {
    void evt;

    if (typeof v === "number") {
    }
  };

  const handleShare = async () => {
    const file = await localforage.getItem<File>("bg-img");
    if (!file) return;

    navigator.share({
      url: window.location.href,
      title: "Share feature",
      text: file.name,
      files: [file],
    });
  };

  return (
    <>
      <IconButton
        onClick={handleDrawerOpen}
        color="inherit"
        sx={{ position: "absolute", top: "1rem", right: "1rem" }}
      >
        <Menu />
      </IconButton>
      <SwipeableDrawer
        open={showDrawer}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
        anchor={isExtraSmall ? "top" : "right"}
        hideBackdrop
        // variant="persistent"
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
              <Close />
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
                    />
                    <CardContent>
                      <CardActionArea
                        component="label"
                        title="click to change image"
                        sx={{ color: "common.white" }}
                      >
                        <StyledImg
                          src={bgImgQuery.data}
                          alt=""
                          sx={{
                            width: "100%",
                            aspectRatio: "16/9",
                            verticalAlign: "bottom",
                          }}
                        />
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
                        value={bgAlpha}
                        onChange={handleBgAlphaChange}
                        valueLabelDisplay="auto"
                      />
                      <Slider
                        value={bgBlur}
                        onChange={handleBgBlurChange}
                        valueLabelDisplay="auto"
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        LinkComponent={"a"}
                        href={bgImgQuery.data || ""}
                        download={`${Date.now()}.png`}
                        title="download image"
                        startIcon={<Download fontSize="small" />}
                        sx={{ textTransform: "lowercase" }}
                      >
                        download
                      </Button>
                    </CardActions>
                  </Card>
                  <Card>
                    <CardHeader title={"Share"} />
                    <CardContent>
                      <Button onClick={handleShare}>share</Button>
                    </CardContent>
                  </Card>
                </Stack>

                <Box height={1000}></Box>
              </Box>
            </ScrollView>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

const StyledImg = styled("img")({});
