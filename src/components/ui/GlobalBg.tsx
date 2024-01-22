// MUI Imports
import { Box, styled, CircularProgress, alpha } from "@mui/material";

// React Imports
import React from "react";
import ReactDOM from "react-dom";

// Store Imports
import { useThemeStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";

// Utils Imports
import { useImmer } from "use-immer";
import localforage from "localforage";
import { timeout } from "@/utils";

import snowVillage from "@/assets/images/snow-village.jpg";

export function GlobalBg() {
  const themeStore = useThemeStore(
    useShallow((store) => {
      return {
        bgAlpha: store.bgAlpha,
        bgBlur: store.bgBlur,
      };
    })
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [bgImgState, updateBgImgState] = useImmer<{
    width: number;
    height: number;
    loading: boolean;
    error: unknown;
    imgSrc: string;
  }>({
    width: 0,
    height: 0,
    loading: true,
    error: null,
    imgSrc: "",
  });

  React.useEffect(() => {
    if (bgImgState.loading) {
      return;
    }

    if (bgImgState.imgSrc) {
      return;
    }

    void (async () => {
      updateBgImgState((prev) => {
        prev.loading = true;
      });

      try {
        const file = await localforage.getItem("bg-img");
        await timeout(1000 * 3);

        if (file instanceof File) {
          updateBgImgState((prev) => {
            prev.imgSrc = URL.createObjectURL(file);
          });
        }

        throw new Error("Invalid file");
      } catch (error) {
        console.error(error);

        updateBgImgState((prev) => {
          prev.error = error;
        });
      } finally {
        updateBgImgState((prev) => {
          prev.loading = false;
        });
      }
    })();
  }, [bgImgState.loading, bgImgState.imgSrc, updateBgImgState]);

  React.useEffect(() => {
    const containerEl = containerRef.current;

    if (!containerEl) {
      return;
    }

    const observer = new ResizeObserver(([{ contentBoxSize }]) => {
      updateBgImgState((prev) => {
        const [size] = contentBoxSize;
        prev.width = size.inlineSize;
        prev.height = size.blockSize;
      });
    });
    observer.observe(containerEl);

    return () => {
      observer.disconnect();
      observer.unobserve(containerEl);
    };
  }, [updateBgImgState]);

  return ReactDOM.createPortal(
    <>
      {bgImgState.loading && (
        <CircularProgress
          size={24}
          sx={{
            position: "fixed",
            left: 24,
            bottom: 24,
          }}
        ></CircularProgress>
      )}
      <Box
        ref={containerRef}
        position={"fixed"}
        zIndex={-1}
        sx={{
          inset: `calc(${20 * (themeStore.bgBlur / 100)}px * -2)`,
          transition(theme) {
            return theme.transitions.create(["filter", "inset"]);
          },
          filter: `blur(${20 * (themeStore.bgBlur / 100)}px)`,
        }}
      >
        <Box
          position={"absolute"}
          zIndex={1}
          bgcolor={alpha("#000", themeStore.bgAlpha / 100)}
          sx={{
            inset: 0,
            transition(theme) {
              return theme.transitions.create(["background-color"]);
            },
          }}
        ></Box>
        <StyledImg
          src={bgImgState.imgSrc || snowVillage}
          alt="Background image"
          onLoad={(evt) => {
            URL.revokeObjectURL(evt.currentTarget.src);
          }}
          width={bgImgState.width}
          height={bgImgState.height}
        ></StyledImg>
      </Box>
    </>,
    document.body
  );
}

export interface GlobalBgProps {
  bgImg: string;
  bgAlpha: number;
  bgBlur: number;
  loading: boolean;
}

const StyledImg = styled("img")({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  objectFit: "cover",
});
