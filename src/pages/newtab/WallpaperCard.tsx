import { FileDownloadOutlined } from "@mui/icons-material";
import {
  IconButton,
  Box,
  useMediaQuery,
  Typography,
  styled,
  Slider,
  FormLabel,
  FormControl,
} from "@mui/material";
import React from "react";
import { useImmer } from "use-immer";
import snowVillage from "@/assets/images/justHer.jpg";
import { useForageFile } from "@/hooks/api-localforage/useForageFile";
import { useThemeStore } from "@/hooks/store/useThemeStore";
import { CollapsedCard } from "./CollapseCard";
import type { Theme } from "@mui/material";
import { WallpaperSwitcher } from "./WallpaperSwitcher";

export function WallpaperCard() {
  const bgAlpha = useThemeStore((store) => store.bgAlpha);
  const setBgAlpha = useThemeStore((store) => store.setBgAlpha);
  const bgBlur = useThemeStore((store) => store.bgBlur);
  const setBgBlur = useThemeStore((store) => store.setBgBlur);

  const smallScreen = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.up("sm");
  });

  const fileKey = smallScreen ? "bg-img" : "mobile-bgimg";
  const query = useForageFile(fileKey);

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

          <WallpaperSwitcher />
        </Box>
      )}

      <FormControl fullWidth>
        <FormLabel>
          <Typography variant="overline">mask concentration</Typography>
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
          <Typography variant="overline">blur</Typography>
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
