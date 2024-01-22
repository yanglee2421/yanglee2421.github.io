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
    error: Error | null;
    imgSrc: string;
  }>({
    width: 0,
    height: 0,
    loading: true,
    error: null,
    imgSrc: "",
  });

  React.useEffect(() => {
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
      } catch (error) {
        console.error(error);

        updateBgImgState((prev) => {
          if (error instanceof Error) {
            prev.error = error;
          }
        });
      } finally {
        updateBgImgState((prev) => {
          prev.loading = false;
        });
      }
    })();
  }, [bgImgState.imgSrc, updateBgImgState]);

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
    <Box ref={containerRef} position={"fixed"} zIndex={-1} sx={{ inset: 0 }}>
      {(() => {
        if (bgImgState.loading) {
          return (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                left: 24,
                bottom: 24,
              }}
            ></CircularProgress>
          );
        }

        if (bgImgState.error) {
          return (
            <StyledImg
              src={snowVillage}
              alt="Background image"
              width={bgImgState.width}
              height={bgImgState.height}
            ></StyledImg>
          );
        }

        if (bgImgState.imgSrc) {
          return (
            <StyledImg
              src={bgImgState.imgSrc}
              alt="Background image"
              onLoad={(evt) => {
                URL.revokeObjectURL(evt.currentTarget.src);
              }}
              width={bgImgState.width}
              height={bgImgState.height}
            ></StyledImg>
          );
        }

        return null;
      })()}
      <Box
        position={"absolute"}
        sx={{
          inset: `calc(${20 * (themeStore.bgBlur / 100)}px * -2)`,
          zIndex: 0,
          filter: `blur(${20 * (themeStore.bgBlur / 100)}px)`,
          transition(theme) {
            return theme.transitions.create(["filter", "inset"]);
          },
        }}
      >
        <Box
          position={"absolute"}
          bgcolor={alpha("#000", themeStore.bgAlpha / 100)}
          sx={{
            inset: 0,
            zIndex: 0,
            transition(theme) {
              return theme.transitions.create(["background-color"]);
            },
          }}
        ></Box>
      </Box>
    </Box>,
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
