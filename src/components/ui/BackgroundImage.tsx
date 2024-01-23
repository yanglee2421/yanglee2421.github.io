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
import { useForageFileQuery } from "@/hooks/api-localforage";
import snowVillage from "@/assets/images/snow-village.jpg";

export function BackgroundImage() {
  const themeStore = useThemeStore(
    useShallow((store) => {
      return {
        bgAlpha: store.bgAlpha,
        bgBlur: store.bgBlur,
      };
    })
  );

  const query = useForageFileQuery("bg-img");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [bgImgState, updateBgImgState] = useImmer({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const containerEl = containerRef.current;

    if (!containerEl) {
      return;
    }

    const observer = new ResizeObserver(([{ contentBoxSize }]) => {
      React.startTransition(() => {
        updateBgImgState((prev) => {
          const [size] = contentBoxSize;
          prev.width = size.inlineSize;
          prev.height = size.blockSize;
        });
      });
    });
    observer.observe(containerEl);

    return () => {
      observer.unobserve(containerEl);
      observer.disconnect();
    };
  }, [updateBgImgState]);

  return ReactDOM.createPortal(
    <>
      {query.isPending && (
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
        {(() => {
          if (query.isPending) {
            return (
              <StyledImg
                src={snowVillage}
                alt="Background image"
                width={bgImgState.width}
                height={bgImgState.height}
              ></StyledImg>
            );
          }

          if (query.isError) {
            return (
              <StyledImg
                src={snowVillage}
                alt={query.error.message}
                width={bgImgState.width}
                height={bgImgState.height}
              ></StyledImg>
            );
          }

          if (query.isSuccess) {
            return (
              <StyledImg
                src={query.data.src}
                alt={query.data.filename}
                onError={() => {
                  query.refetch();
                }}
                width={bgImgState.width}
                height={bgImgState.height}
              ></StyledImg>
            );
          }
        })()}
      </Box>
    </>,
    document.body
  );
}

const StyledImg = styled("img")({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  objectFit: "cover",
});
