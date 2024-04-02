import { Box, alpha } from "@mui/material";
import React from "react";
import { useImmer } from "use-immer";

export function ScrollArea(props: React.PropsWithChildren) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const [state, updateState] = useImmer({
    thumbWidth: 0,
    thumbHeight: 0,
    thumbTop: 0,
    thumbLeft: 0,

    clientWidth: 0,
    clientHeight: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    scrollTop: 0,
    scrollLeft: 0,
  });

  React.useEffect(() => {
    const container = containerRef.current;

    if (!(container instanceof HTMLElement)) {
      return;
    }

    const content = contentRef.current;

    if (!(content instanceof HTMLElement)) {
      return;
    }

    const observer = new ResizeObserver(() => {
      React.startTransition(() => {
        updateState((draft) => {
          draft.clientWidth = container.clientWidth;
          draft.clientHeight = container.clientHeight;
          draft.scrollWidth = content.clientWidth;
          draft.scrollHeight = content.clientHeight;
          draft.thumbWidth = Math.floor(
            Math.max(8, draft.clientWidth ** 2 / draft.scrollWidth),
          );
          draft.thumbHeight = Math.floor(
            Math.max(8, draft.clientHeight ** 2 / draft.scrollHeight),
          );
        });
      });
    });

    observer.observe(container);
    observer.observe(content);

    return () => {
      observer.disconnect();
    };
  }, [updateState]);

  console.log(state);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        ref={contentRef}
        sx={{
          width: "fit-content",
          minWidth: "100%",
          height: "fit-content",
          minHeight: "100%",
          userSelect: "none",
        }}
      >
        {props.children}
      </Box>

      {/* X Rail */}
      <Box
        sx={{
          position: "absolute",
          left: state.scrollLeft,
          bottom: 0,

          width: state.clientWidth,
          height: 15,
        }}
      >
        {/* X Thumb */}
        <Box
          sx={{
            position: "absolute",
            left: state.thumbLeft,
            bottom: 2,

            width: 50,
            height: 6,

            borderRadius(theme) {
              return theme.shape.borderRadius + "px";
            },
            bgcolor: alpha("#000", 0.2),
          }}
        ></Box>
      </Box>

      {/* Y Rail */}
      <Box
        sx={{
          position: "absolute",
          top: state.scrollTop,
          right: 0,

          width: 15,
          height: state.clientHeight,
        }}
      >
        {/* Y Thumb */}
        <Box
          component={"div"}
          onMouseDown={(evt) => {
            console.log(evt);

            if (Object.is(evt.button, 2)) {
              return;
            }

            const yStart = evt.pageY;
            const controller = new AbortController();
            const signal = controller.signal;

            document.addEventListener(
              "mouseup",
              (evt) => {
                if (Object.is(evt.button, 2)) {
                  return;
                }

                controller.abort();
              },
              {
                signal,
              },
            );

            document.addEventListener(
              "mousemove",
              (evt) => {
                updateState((draft) => {
                  const nextY = draft.thumbTop + evt.pageY - yStart;
                  const maxY = draft.clientHeight - draft.thumbHeight;
                  const minY = 0;

                  if (nextY > maxY) {
                    draft.thumbTop = maxY;
                    return;
                  }

                  if (nextY < minY) {
                    draft.thumbTop = minY;
                    return;
                  }

                  draft.thumbTop = nextY;
                });
              },
              { signal },
            );
          }}
          sx={{
            position: "absolute",
            top: state.thumbTop,
            right: 2,

            width: 6,
            height: state.thumbHeight,

            borderRadius(theme) {
              return theme.shape.borderRadius + "px";
            },
            bgcolor: alpha("#000", 0.2),
          }}
        ></Box>
      </Box>
    </Box>
  );
}
