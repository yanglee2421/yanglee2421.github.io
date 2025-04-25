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
  const xStartClientXRef = React.useRef(0);
  const yStartClientYRef = React.useRef(0);
  const xThumbLeftRef = React.useRef(0);
  const yThumbTopRef = React.useRef(0);

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

  const yThumbHeight = Math.max(
    18,
    scrollInfo.clientHeight ** 2 / scrollInfo.scrollHeight,
  );
  const xThumbWidth = Math.max(
    18,
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
          {children || (
            <Box height={1000} width={1000}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              vitae quos repudiandae voluptate magnam molestias, aspernatur
              tempora? Distinctio, cupiditate perspiciatis temporibus
              repellendus iste, quo nostrum illum adipisci, tempora at dolorum.
              Architecto eius, optio officia velit repellat illo tempore dolor
              ipsam tenetur voluptatibus pariatur impedit nulla doloremque
              quidem harum molestias quis, eos a autem? Eveniet libero itaque
              nisi, sit molestiae maiores. Odio quidem reprehenderit soluta
              ratione odit quo cumque, quam nesciunt eum distinctio error sunt
              voluptate molestias iusto vero quia ab! Sint maiores ad cum. Cum
              placeat tempore delectus mollitia nemo! Totam placeat laborum,
              itaque delectus deserunt quam ut, ratione quibusdam pariatur magni
              cupiditate distinctio voluptates aliquid in sed deleniti sunt quas
              perspiciatis aperiam assumenda animi non veniam velit odio? Quis?
              Commodi eos deserunt neque voluptatem sed cumque nostrum at
              possimus, aliquam molestiae alias vero ipsa voluptas ex minus
              laudantium optio? Voluptatem repellendus dolor, quae cupiditate
              rerum iure et nisi magni.
            </Box>
          )}
        </Box>
      </Box>

      {/* Vertical scrollbar */}
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
            blockSize: yThumbHeight,
            transform: `translate3d(0, ${yThumbTop}px, 0)`,
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

            yStartClientYRef.current = e.clientY;
            yThumbTopRef.current = yThumbTop;

            const activeY = e.currentTarget.hasPointerCapture(e.pointerId);
            setScrollBarInfo((prev) => ({ ...prev, activeY }));
          }}
          onPointerMove={(e) => {
            const hasPointerCapture = e.currentTarget.hasPointerCapture(
              e.pointerId,
            );
            if (!hasPointerCapture) return;

            const scrollView = scrollViewRef.current;
            if (!scrollView) return;

            const translationY = e.clientY - yStartClientYRef.current;
            const top = translationY + yThumbTopRef.current;

            scrollView.scrollTop =
              (yScrollableHeight / yThumbScrollableHeight) * top;
          }}
          onPointerUp={(e) => {
            e.currentTarget.releasePointerCapture(e.pointerId);
            const activeY = e.currentTarget.hasPointerCapture(e.pointerId);
            setScrollBarInfo((prev) => ({ ...prev, activeY }));
          }}
        />
      </Box>

      {/* Horizontal scrollbar */}
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
              inlineSize: xThumbWidth,
              blockSize: "100%",
              transform: `translate3d(${xThumbLeft}px, 0, 0)`,
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

              xStartClientXRef.current = e.clientX;
              xThumbLeftRef.current = xThumbLeft;

              const activeX = e.currentTarget.hasPointerCapture(e.pointerId);
              setScrollBarInfo((prev) => ({ ...prev, activeX }));
            }}
            onPointerMove={(e) => {
              const hasPointerCapture = e.currentTarget.hasPointerCapture(
                e.pointerId,
              );
              if (!hasPointerCapture) return;

              const scrollView = scrollViewRef.current;
              if (!scrollView) return;

              const translationX = e.clientX - xStartClientXRef.current;
              const left = translationX + xThumbLeftRef.current;

              scrollView.scrollLeft =
                (xScrollableWidth / xThumbScrollableWidth) * left;
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              const activeX = e.currentTarget.hasPointerCapture(e.pointerId);
              setScrollBarInfo((prev) => ({ ...prev, activeX }));
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
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: 3,
          }}
        />
      )}
    </Box>
  );
};
