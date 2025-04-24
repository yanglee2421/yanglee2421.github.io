import { Box } from "@mui/material";
import React from "react";

export interface ScrollProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

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

  React.useEffect(() => {
    const scrollContent = scrollContentRef.current;
    if (!scrollContent) return;

    const observer = new ResizeObserver(() => {
      updateScrollInfo();
    });
    observer.observe(scrollContentRef.current!);

    return () => {
      observer.disconnect();
    };
  }, [updateScrollInfo]);

  const thumbHeight = Math.max(
    30,
    scrollInfo.clientHeight ** 2 / scrollInfo.scrollHeight,
  );
  const thumbWidth = Math.max(
    30,
    scrollInfo.clientWidth ** 2 / scrollInfo.scrollWidth,
  );

  const needScrollX = scrollInfo.scrollWidth > scrollInfo.clientWidth;
  const needScrollY = scrollInfo.scrollHeight > scrollInfo.clientHeight;
  const cornerWidth = needScrollY ? 12 : 0;
  const cornerHeight = needScrollX ? 12 : 0;
  const thummbScrollableWidth =
    scrollInfo.clientWidth - cornerWidth - thumbWidth;
  const thummbScrollableHeight =
    scrollInfo.clientHeight - cornerHeight - thumbHeight;
  const scrollableWidth = scrollInfo.scrollWidth - scrollInfo.clientWidth;
  const scrollableHeight = scrollInfo.scrollHeight - scrollInfo.clientHeight;

  const thumbTop =
    (scrollInfo.scrollTop / scrollableHeight) * thummbScrollableHeight;

  const thumbLeft =
    (scrollInfo.scrollLeft / scrollableWidth) * thummbScrollableWidth;

  const renderBackgroundColor = (isActive: boolean, isHover: boolean) => {
    if (isActive) {
      return "rgba(255, 255, 255, 0.5)";
    }

    if (isHover) {
      return "rgba(255, 255, 255, 0.3)";
    }

    return "rgba(255, 255, 255, 0.1)";
  };

  const backgroundColorX = renderBackgroundColor(
    scrollBarInfo.activeX,
    scrollBarInfo.hoverX,
  );
  const backgroundColorY = renderBackgroundColor(
    scrollBarInfo.activeY,
    scrollBarInfo.hoverY,
  );

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
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Webkit
          msOverflowStyle: "none", // IE/Edge
        }}
        onScroll={updateScrollInfo}
      >
        <Box ref={scrollContentRef}>
          {children || <Box height={1000}>滚动内容区域</Box>}
        </Box>
      </Box>

      {/* 垂直滚动条 */}
      <Box
        sx={{
          position: "absolute",
          insetInlineEnd: 0,
          insetBlockStart: 0,
          inlineSize: 12,

          display: { xs: "none", sm: "block" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            insetInlineEnd: 0,
            insetBlockStart: 0,
            inlineSize: "100%",
            blockSize: thumbHeight,
            transform: `translate3d(0, ${thumbTop}px, 0)`,
            backgroundColor: backgroundColorY,
            cursor: "pointer",
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
            const activeY = e.currentTarget.hasPointerCapture(e.pointerId);
            setScrollBarInfo((prev) => ({
              ...prev,
              activeY,
            }));
          }}
          onPointerMove={(e) => {
            const hasPointerCapture = e.currentTarget.hasPointerCapture(
              e.pointerId,
            );
            if (!hasPointerCapture) return;

            const container = scrollViewRef.current;
            if (!container) return;

            const top = e.clientY - container.getBoundingClientRect().top;
            container.scrollTop =
              (scrollableHeight / thummbScrollableHeight) * top;
          }}
          onPointerUp={(e) => {
            e.currentTarget.releasePointerCapture(e.pointerId);
            const activeY = e.currentTarget.hasPointerCapture(e.pointerId);
            setScrollBarInfo((prev) => ({
              ...prev,
              activeY,
            }));
          }}
        />
      </Box>

      {/* 水平滚动条 */}
      {needScrollX && (
        <Box
          sx={{
            position: "absolute",
            insetInlineStart: 0,
            insetBlockEnd: 0,
            inlineSize: "100%",
            blockSize: 12,

            display: { xs: "none", sm: "block" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              insetInlineStart: 0,
              insetBlockEnd: 0,
              inlineSize: thumbWidth,
              blockSize: "100%",
              transform: `translate3d(${thumbLeft}px, 0, 0)`,
              backgroundColor: backgroundColorX,
              cursor: "pointer",
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
              const activeX = e.currentTarget.hasPointerCapture(e.pointerId);
              setScrollBarInfo((prev) => ({
                ...prev,
                activeX,
              }));
            }}
            onPointerMove={(e) => {
              const hasPointerCapture = e.currentTarget.hasPointerCapture(
                e.pointerId,
              );
              if (!hasPointerCapture) return;

              const container = scrollViewRef.current;
              if (!container) return;

              const left = e.clientX - container.getBoundingClientRect().left;
              container.scrollLeft =
                (scrollableWidth / thummbScrollableWidth) * left;
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              const activeX = e.currentTarget.hasPointerCapture(e.pointerId);
              setScrollBarInfo((prev) => ({
                ...prev,
                activeX,
              }));
            }}
          />
        </Box>
      )}

      {/* 右下角区域 */}
      {needScrollX && needScrollY && (
        <Box
          sx={{
            position: "absolute",
            insetInlineEnd: 0,
            insetBlockEnd: 0,
            inlineSize: 12,
            blockSize: 12,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: 3,
          }}
        />
      )}
    </Box>
  );
};
