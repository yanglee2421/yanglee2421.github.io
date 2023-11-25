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
import { Scrollbar } from "@/components";

// Query Imports
import { useThemeMutation, useThemeQuery } from "@/hooks/api-theme";

export function BlankMenu() {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const isExtraSmall = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.down("sm");
  });

  const themeQuery = useThemeQuery();
  const themeMutation = useThemeMutation();
  const { bgImg, bgAlpha, bgBlur } = themeQuery.data;
  const [alpha, setAlpha] = React.useState(() => bgAlpha);
  const [blur, setBlur] = React.useState(() => bgBlur);

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
    try {
      const dataURL = await new Promise<string>((res, rej) => {
        const file = evt.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onerror = (evt) => {
            rej(evt.target?.error);
          };
          reader.onload = (evt) => {
            const dataURL = evt.target?.result;
            if (typeof dataURL === "string") {
              res(dataURL);
              return;
            }

            rej(new Error("result is not a string"));
          };
        }
      });

      themeMutation.mutate({
        ...themeQuery.data,
        bgImg: dataURL,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBgAlphaChange: SliderProps["onChange"] = (evt, v) => {
    void evt;

    if (typeof v === "number") {
      setAlpha(v);
      themeMutation.mutate({
        ...themeQuery.data,
        bgAlpha: v,
      });
    }
  };

  const handleBgblurChange: SliderProps["onChange"] = (evt, v) => {
    void evt;

    if (typeof v === "number") {
      setBlur(v);
      themeMutation.mutate({
        ...themeQuery.data,
        bgBlur: v,
      });
    }
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
            <Scrollbar>
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
                          src={bgImg}
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
                        defaultValue={alpha}
                        onChange={handleBgAlphaChange}
                      />
                      <Slider
                        defaultValue={blur}
                        onChange={handleBgblurChange}
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        LinkComponent={"a"}
                        href={bgImg}
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
                    <CardContent></CardContent>
                  </Card>
                </Stack>

                <Box height={1000}>465464161</Box>
              </Box>
            </Scrollbar>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

const StyledImg = styled("img")({});
