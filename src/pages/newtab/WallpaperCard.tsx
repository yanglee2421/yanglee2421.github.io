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
import { WallpaperSwitcher } from "./WallpaperSwitcher";
import type { Theme } from "@mui/material";

export function WallpaperCard() {
  const bgAlpha = useThemeStore((store) => store.bgAlpha);
  const setBgAlpha = useThemeStore((store) => store.setBgAlpha);
  const bgBlur = useThemeStore((store) => store.bgBlur);
  const setBgBlur = useThemeStore((store) => store.setBgBlur);
  const xsBgImgKey = useThemeStore((store) => store.xsBgImgKey);
  const smBgImgKey = useThemeStore((store) => store.smBgImgKey);

  const smallScreen = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.up("sm");
  });

  const query = useForageFile(smallScreen ? smBgImgKey : xsBgImgKey);

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
            if (query.data) {
              return (
                <StyledImg
                  key="xxx"
                  src={URL.createObjectURL(query.data)}
                  alt={query.data.name}
                  onLoad={(evt) => {
                    URL.revokeObjectURL(evt.currentTarget.src);
                  }}
                  width={setting.imageWidth}
                  height={setting.imageHeight}
                />
              );
            }

            return (
              <StyledImg
                src={fallbackImage}
                alt="fallback background image"
                width={setting.imageWidth}
                height={setting.imageHeight}
              />
            );
          })()}

          {(() => {
            if (query.data) {
              return <DownloadButton file={query.data} />;
            }
          })()}

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

function DownloadButton(props: { file: File }) {
  const [downloadLink, setDownloadLink] = React.useState("");

  React.useEffect(() => {
    const href = URL.createObjectURL(props.file);
    setDownloadLink(href);

    return () => {
      URL.revokeObjectURL(href);
    };
  }, [props.file, setDownloadLink]);

  return (
    <IconButton
      LinkComponent={"a"}
      href={downloadLink}
      download={props.file.name}
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
  );
}
