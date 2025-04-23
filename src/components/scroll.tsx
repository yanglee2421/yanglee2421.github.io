import { Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";

export interface ScrollProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Scroll = ({ children, className, style }: ScrollProps) => {
  // 引用容器和内容区域
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 滚动状态
  const [scrollInfo, setScrollInfo] = useState({
    scrollLeft: 0,
    scrollTop: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    clientWidth: 0,
    clientHeight: 0,
  });

  // 拖动状态
  const [dragging, setDragging] = useState({
    vertical: false,
    horizontal: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startScrollTop: 0,
  });

  // 监听滚动事件
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollInfo({
        scrollLeft: container.scrollLeft,
        scrollTop: container.scrollTop,
        scrollWidth: container.scrollWidth,
        scrollHeight: container.scrollHeight,
        clientWidth: container.clientWidth,
        clientHeight: container.clientHeight,
      });
    };

    container.addEventListener("scroll", handleScroll);
    // 初始化滚动信息
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 垂直滚动条处理
  const handleVerticalDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging({
      ...dragging,
      vertical: true,
      startY: e.clientY,
      startScrollTop: scrollInfo.scrollTop,
    });
  };

  // 水平滚动条处理
  const handleHorizontalDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging({
      ...dragging,
      horizontal: true,
      startX: e.clientX,
      startScrollLeft: scrollInfo.scrollLeft,
    });
  };

  // 处理鼠标移动和释放事件
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      if (dragging.vertical) {
        const deltaY = e.clientY - dragging.startY;
        const scrollRatio = scrollInfo.scrollHeight / scrollInfo.clientHeight;
        const newScrollTop = dragging.startScrollTop + deltaY * scrollRatio;
        containerRef.current.scrollTop = Math.max(
          0,
          Math.min(
            newScrollTop,
            scrollInfo.scrollHeight - scrollInfo.clientHeight,
          ),
        );
      }

      if (dragging.horizontal) {
        const deltaX = e.clientX - dragging.startX;
        const scrollRatio = scrollInfo.scrollWidth / scrollInfo.clientWidth;
        const newScrollLeft = dragging.startScrollLeft + deltaX * scrollRatio;
        containerRef.current.scrollLeft = Math.max(
          0,
          Math.min(
            newScrollLeft,
            scrollInfo.scrollWidth - scrollInfo.clientWidth,
          ),
        );
      }
    };

    const handleMouseUp = () => {
      setDragging({
        ...dragging,
        vertical: false,
        horizontal: false,
      });
    };

    if (dragging.vertical || dragging.horizontal) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, scrollInfo]);

  // 计算滚动条尺寸和位置
  const verticalThumbHeight = Math.max(
    30,
    (scrollInfo.clientHeight / scrollInfo.scrollHeight) *
      scrollInfo.clientHeight,
  );

  const verticalThumbTop =
    (scrollInfo.scrollTop /
      (scrollInfo.scrollHeight - scrollInfo.clientHeight)) *
    (scrollInfo.clientHeight - verticalThumbHeight);

  const horizontalThumbWidth = Math.max(
    30,
    (scrollInfo.clientWidth / scrollInfo.scrollWidth) * scrollInfo.clientWidth,
  );

  const horizontalThumbLeft =
    (scrollInfo.scrollLeft /
      (scrollInfo.scrollWidth - scrollInfo.clientWidth)) *
    (scrollInfo.clientWidth - horizontalThumbWidth);

  // 是否显示滚动条
  const showVertical = scrollInfo.scrollHeight > scrollInfo.clientHeight;
  const showHorizontal = scrollInfo.scrollWidth > scrollInfo.clientWidth;

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
        ref={containerRef}
        sx={{
          inlineSize: "100%",
          blockSize: "100%",
          overflow: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Webkit
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        <Box ref={contentRef}>
          {children || (
            <Box height={2000} width={2000}>
              滚动内容区域
            </Box>
          )}
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
            blockSize: verticalThumbHeight,
            transform: `translate3d(0, ${verticalThumbTop}px, 0)`,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
          onMouseDown={handleVerticalDragStart}
        />
      </Box>

      {/* 水平滚动条 */}
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
            inlineSize: horizontalThumbWidth,
            blockSize: "100%",
            transform: `translate3d(${horizontalThumbLeft}px, 0, 0)`,
            backgroundColor: "rgba(186, 68, 68, 0.3)",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
          onMouseDown={handleHorizontalDragStart}
        />
      </Box>

      {/* 右下角区域 */}
      {showVertical && showHorizontal && (
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
