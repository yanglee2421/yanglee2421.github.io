import { Box } from "@mui/material";
import React from "react";

const renderBackgroundColor = (isActive: boolean, isHover: boolean) => {
  if (isActive) {
    return "rgba(255, 255, 255, 0.5)";
  }

  if (isHover) {
    return "rgba(255, 255, 255, 0.3)";
  }

  return "rgba(255, 255, 255, 0.1)";
};

export type ScrollProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const Scroll = ({ children, className, style }: ScrollProps) => {
  const [scrollInfo, setScrollInfo] = React.useState({
    scrollLeft: 0,
    scrollTop: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    clientWidth: 0,
    clientHeight: 0,
  });

  const [scrollBarInfo, setScrollBarInfo] = React.useState({
    activeX: false,
    activeY: false,
    hoverX: false,
    hoverY: false,
  });

  const scrollViewRef = React.useRef<HTMLDivElement>(null);
  const scrollContentRef = React.useRef<HTMLDivElement>(null);
  const xStartClientXRef = React.useRef(0);
  const yStartClientYRef = React.useRef(0);
  const xThumbLeftRef = React.useRef(0);
  const yThumbTopRef = React.useRef(0);
  const xRafRef = React.useRef(0);
  const yRafRef = React.useRef(0);
  const scrollRafRef = React.useRef(0);

  const updateScrollInfo = React.useCallback(() => {
    const container = scrollViewRef.current;
    if (!container) return;

    setScrollInfo({
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
      scrollWidth: container.scrollWidth,
      scrollHeight: container.scrollHeight,
      clientWidth: container.clientWidth,
      clientHeight: container.clientHeight,
    });
  }, []);

  const yThumbHeight = Math.max(
    20,
    scrollInfo.clientHeight ** 2 / scrollInfo.scrollHeight,
  );
  const xThumbWidth = Math.max(
    20,
    scrollInfo.clientWidth ** 2 / scrollInfo.scrollWidth,
  );

  const {
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight,
    scrollLeft,
    scrollTop,
  } = scrollInfo;
  const xScrollbarHeight = 12;
  const yScrollbarWidth = 12;
  const xScrollableWidth = scrollWidth - clientWidth;
  const yScrollableHeight = scrollHeight - clientHeight;
  const needScrollX = !!Math.floor(xScrollableWidth);
  const needScrollY = !!Math.floor(yScrollableHeight);
  const cornerWidth = needScrollY ? yScrollbarWidth : 0;
  const cornerHeight = needScrollX ? xScrollbarHeight : 0;
  const xThumbScrollableWidth = clientWidth - cornerWidth - xThumbWidth;
  const yThumbScrollableHeight = clientHeight - cornerHeight - yThumbHeight;
  const yThumbTop = scrollTop * (yThumbScrollableHeight / yScrollableHeight);
  const xThumbLeft = scrollLeft * (xThumbScrollableWidth / xScrollableWidth);

  const backgroundColorX = renderBackgroundColor(
    scrollBarInfo.activeX,
    scrollBarInfo.hoverX,
  );
  const backgroundColorY = renderBackgroundColor(
    scrollBarInfo.activeY,
    scrollBarInfo.hoverY,
  );

  const handleActiveXChange = (e: React.PointerEvent<HTMLDivElement>) => {
    const activeX = e.currentTarget.hasPointerCapture(e.pointerId);
    setScrollBarInfo((prev) => ({ ...prev, activeX }));
  };
  const handleActiveYChange = (e: React.PointerEvent<HTMLDivElement>) => {
    const activeY = e.currentTarget.hasPointerCapture(e.pointerId);
    setScrollBarInfo((prev) => ({ ...prev, activeY }));
  };

  React.useEffect(() => {
    const scrollContent = scrollContentRef.current;
    if (!scrollContent) return;

    let raf = 0;

    const observer = new ResizeObserver(() => {
      /**
       * Performance optimization:
       * Separate the reading and writing of layout information by requestAnimationFrame
       * to avoid Forced Reflow / Forced Layout
       */
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateScrollInfo);
    });
    observer.observe(scrollContent);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [updateScrollInfo]);

  return (
    <Box
      sx={{
        inlineSize: "100%",
        blockSize: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      className={className}
      style={style}
    >
      <Box
        ref={scrollViewRef}
        sx={{
          inlineSize: "100%",
          blockSize: "100%",
          overflow: "auto",
          // Firefox
          scrollbarWidth: "none",
          // Webkit
          "&::-webkit-scrollbar": { display: "none" },
          // IE/Edge
          msOverflowStyle: "none",
        }}
        onScroll={() => {
          cancelAnimationFrame(scrollRafRef.current);
          scrollRafRef.current = requestAnimationFrame(updateScrollInfo);
        }}
      >
        <Box ref={scrollContentRef}>{children}</Box>
      </Box>

      {/* Vertical scrollbar */}
      {needScrollY && (
        <Box
          sx={{
            position: "absolute",
            insetInlineEnd: 0,
            insetBlockStart: 0,
            inlineSize: 12,
            pointerEvents: "none",

            display: { xs: "none", sm: "block" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              insetInlineEnd: 0,
              insetBlockStart: 0,

              inlineSize: "100%",
              blockSize: yThumbHeight,
              backgroundColor: backgroundColorY,

              // Use translate3d to enable GPU acceleration
              transform: `translate3d(0, ${yThumbTop}px, 0)`,

              cursor: "pointer",
              pointerEvents: "auto",
              userSelect: "none",
              touchAction: "none",
            }}
            onPointerEnter={() => {
              setScrollBarInfo((prev) => ({ ...prev, hoverY: true }));
            }}
            onPointerLeave={() => {
              setScrollBarInfo((prev) => ({ ...prev, hoverY: false }));
            }}
            onPointerDown={(e) => {
              if (!e.nativeEvent.isPrimary) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              e.preventDefault();

              yStartClientYRef.current = e.clientY;
              yThumbTopRef.current = yThumbTop;

              handleActiveYChange(e);
            }}
            onPointerMove={(e) => {
              const hasPointerCapture = e.currentTarget.hasPointerCapture(
                e.pointerId,
              );
              if (!hasPointerCapture) return;

              /**
               * Performance optimization:
               * Ensure only execute scroll once per frame
               */
              cancelAnimationFrame(yRafRef.current);
              yRafRef.current = requestAnimationFrame(() => {
                const scrollView = scrollViewRef.current;
                if (!scrollView) return;

                const translationY = e.clientY - yStartClientYRef.current;
                const top = translationY + yThumbTopRef.current;
                scrollView.scrollTop =
                  (yScrollableHeight / yThumbScrollableHeight) * top;
              });
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              handleActiveYChange(e);
            }}
            onPointerCancel={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              handleActiveYChange(e);
            }}
          />
        </Box>
      )}

      {/* Horizontal scrollbar */}
      {needScrollX && (
        <Box
          sx={{
            position: "absolute",
            insetInlineStart: 0,
            insetBlockEnd: 0,
            inlineSize: "100%",
            blockSize: 12,
            pointerEvents: "none",

            display: { xs: "none", sm: "block" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              insetInlineStart: 0,
              insetBlockEnd: 0,

              inlineSize: xThumbWidth,
              blockSize: "100%",
              backgroundColor: backgroundColorX,

              // Use translate3d to enable GPU acceleration
              transform: `translate3d(${xThumbLeft}px, 0, 0)`,

              cursor: "pointer",
              pointerEvents: "auto",
              userSelect: "none",
              touchAction: "none",
            }}
            onPointerEnter={() => {
              setScrollBarInfo((prev) => ({ ...prev, hoverX: true }));
            }}
            onPointerLeave={() => {
              setScrollBarInfo((prev) => ({ ...prev, hoverX: false }));
            }}
            onPointerDown={(e) => {
              if (!e.nativeEvent.isPrimary) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              e.preventDefault();

              xStartClientXRef.current = e.clientX;
              xThumbLeftRef.current = xThumbLeft;

              handleActiveXChange(e);
            }}
            onPointerMove={(e) => {
              const hasPointerCapture = e.currentTarget.hasPointerCapture(
                e.pointerId,
              );
              if (!hasPointerCapture) return;

              /**
               * Performance optimization:
               * Ensure only execute scroll once per frame
               */
              cancelAnimationFrame(xRafRef.current);
              xRafRef.current = requestAnimationFrame(() => {
                const scrollView = scrollViewRef.current;
                if (!scrollView) return;

                const translationX = e.clientX - xStartClientXRef.current;
                const left = translationX + xThumbLeftRef.current;
                scrollView.scrollLeft =
                  (xScrollableWidth / xThumbScrollableWidth) * left;
              });
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              handleActiveXChange(e);
            }}
            onPointerCancel={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              handleActiveXChange(e);
            }}
          />
        </Box>
      )}

      {/* Scrollbar corner */}
      {needScrollX && needScrollY && (
        <Box
          sx={{
            position: "absolute",
            insetInlineEnd: 0,
            insetBlockEnd: 0,
            inlineSize: 12,
            blockSize: 12,
            backgroundColor: "transparent",
            pointerEvents: "none",
          }}
        />
      )}
    </Box>
  );
};
