import { FileDownloadOutlined } from "@mui/icons-material";
import {
  IconButton,
  Box,
  useMediaQuery,
  Typography,
  styled,
  CardActionArea,
  Slider,
  FormLabel,
  FormControl,
  alpha,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import { useImmer } from "use-immer";
import snowVillage from "@/assets/images/snow-village.jpg";
import { useForageFileMutation } from "@/hooks/api-localforage/useForageFileMutation";
import { useForageFileQuery } from "@/hooks/api-localforage/useForageFileQuery";
import { useThemeStore } from "@/hooks/store/useThemeStore";
import { CollapsedCard } from "./CollapseCard";
import type { Theme } from "@mui/material";

export function WallpaperCard() {
  const bgAlpha = useThemeStore((store) => store.bgAlpha);
  const setBgAlpha = useThemeStore((store) => store.setBgAlpha);
  const bgBlur = useThemeStore((store) => store.bgBlur);
  const setBgBlur = useThemeStore((store) => store.setBgBlur);

  const smallScreen = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.up("sm");
  });

  const fileKey = smallScreen ? "bg-img" : "mobile-bgimg";
  const query = useForageFileQuery(fileKey);
  const mutation = useForageFileMutation();

  const [setting, updateSetting] = useImmer({
    imageWidth: 0,
    imageHeight: 0,
    wallpaperCollapsed: false,
    wallpaperSource: "custom",
  });

  const imgBoxRef = React.useRef<HTMLLabelElement>(null);

  React.useEffect(() => {
    const el = imgBoxRef.current;

    if (!(el instanceof HTMLElement)) {
      return;
    }

    const observer = new ResizeObserver(([{ contentBoxSize }]) => {
      React.startTransition(() => {
        updateSetting((prev) => {
          const [size] = contentBoxSize;
          prev.imageWidth = size.inlineSize;
          prev.imageHeight = size.blockSize;
        });
      });
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [updateSetting]);

  const fallbackImage = new URL(snowVillage, import.meta.url).href;

  return (
    <CollapsedCard title="wallpaper" subheader="Wallpaper setting">
      {setting.wallpaperSource === "bing" ? (
        <Box></Box>
      ) : (
        <Box
          ref={imgBoxRef}
          sx={{
            aspectRatio: { xs: "9/16", sm: "16/9" },
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
            borderRadius(theme) {
              return theme.shape.borderRadius + "px";
            },
          }}
        >
          {(() => {
            if (query.isPending) {
              return (
                <StyledImg
                  src={fallbackImage}
                  alt="Background image preview"
                  width={setting.imageWidth}
                  height={setting.imageHeight}
                />
              );
            }

            if (query.isError) {
              return (
                <StyledImg
                  src={fallbackImage}
                  alt={query.error.message}
                  width={setting.imageWidth}
                  height={setting.imageHeight}
                />
              );
            }

            return (
              <StyledImg
                key="xxx"
                src={query.data.src}
                alt={query.data.filename}
                onError={() => {
                  query.refetch();
                }}
                width={setting.imageWidth}
                height={setting.imageHeight}
              />
            );
          })()}

          <IconButton
            LinkComponent={"a"}
            href={query.data?.src || fallbackImage}
            download={query.data?.filename}
            title="download image"
            sx={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              zIndex: 4,
              color: "common.white",
            }}
          >
            <FileDownloadOutlined />
          </IconButton>

          <CardActionArea
            component="label"
            title="click to change image"
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              backgroundColor: alpha("#000", 0.2),
              opacity: 0,
              transition(theme) {
                return theme.transitions.create(["opacity"]);
              },
              "&:hover": {
                opacity: 1,
              },
              display: "flex",
            }}
          >
            <Button
              component="span"
              disableRipple
              disableFocusRipple
              disableTouchRipple
              disableElevation
              variant="contained"
              color="inherit"
              sx={{
                color: "common.white",
                bgcolor: alpha("#000", 0.3),
                "&:hover": {
                  bgcolor: alpha("#000", 0.3),
                },
              }}
            >
              Change
            </Button>
            <input
              value={""}
              onChange={async (evt) => {
                const file = evt.target.files?.item(0);

                if (file) {
                  mutation.mutate({ file, fileKey });
                }
              }}
              type="file"
              accept="image/*"
              hidden
            />
          </CardActionArea>
        </Box>
      )}

      <FormControl>
        <FormLabel>
          <Typography variant="overline">Source</Typography>
        </FormLabel>

        <RadioGroup
          value={setting.wallpaperSource}
          onChange={(evt, value) => {
            void evt;
            updateSetting((draft) => {
              draft.wallpaperSource = value;
            });
          }}
          row
        >
          <FormControlLabel control={<Radio />} label="Bing" value="bing" />
          <FormControlLabel control={<Radio />} label="Custom" value="custom" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>
          <Typography variant="overline">Background alpha</Typography>
        </FormLabel>
        <Slider
          value={bgAlpha}
          onChange={(evt, v) => {
            void evt;

            if (typeof v === "number") {
              setBgAlpha(v);
            }
          }}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel>
          <Typography variant="overline">Background blur</Typography>
        </FormLabel>
        <Slider
          value={bgBlur}
          onChange={(evt, v) => {
            void evt;

            if (typeof v === "number") {
              setBgBlur(v);
            }
          }}
          valueLabelDisplay="auto"
        />
      </FormControl>
    </CollapsedCard>
  );
}

const StyledImg = styled("img")(() => {
  return {
    objectFit: "cover",
    verticalAlign: "bottom",
    position: "relative",
    zIndex: 2,
  };
});
