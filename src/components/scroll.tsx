import { Box } from "@mui/material";
import React from "react";

export interface ScrollProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// 工具函数：确保值在指定范围内
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
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

  // 滚动视图和内容的引用
  const scrollViewRef = React.useRef<HTMLDivElement>(null);
  const scrollContentRef = React.useRef<HTMLDivElement>(null);

  // 滚动条滑块的引用
  const xThumbRef = React.useRef<HTMLDivElement>(null);
  const yThumbRef = React.useRef<HTMLDivElement>(null);

  // 用于处理拖动的 RAF 引用
  const xRafRef = React.useRef<number>(0);
  const yRafRef = React.useRef<number>(0);
  const scrollRafRef = React.useRef<number>(0);

  // 更新滚动信息
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

  // 监听容器大小变化
  React.useEffect(() => {
    const scrollContent = scrollContentRef.current;
    if (!scrollContent) return;

    let raf = 0;

    const observer = new ResizeObserver(() => {
      /**
       * 性能优化：
       * 使用 requestAnimationFrame 分离布局读取和写入操作
       * 避免强制重排/重绘
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

  // 设置垂直滚动条的原生事件处理
  React.useEffect(() => {
    const yThumb = yThumbRef.current;
    const scrollView = scrollViewRef.current;
    if (!yThumb || !scrollView) return;

    // 创建 AbortController 用于清理事件监听器
    const controller = new AbortController();
    const { signal } = controller;

    // 存储拖动状态
    const dragState = {
      startClientY: 0,
      startThumbTop: 0,
      isDragging: false,
    };

    // 垂直方向的尺寸计算
    const getYThumbMetrics = () => {
      const { scrollHeight, clientHeight } = scrollView;
      const yScrollableHeight = scrollHeight - clientHeight;
      const yThumbHeight = Math.max(18, clientHeight ** 2 / scrollHeight);
      const needScrollX = scrollView.scrollWidth > scrollView.clientWidth;
      const cornerHeight = needScrollX ? 12 : 0;
      const yThumbScrollableHeight = clientHeight - cornerHeight - yThumbHeight;

      return {
        yThumbHeight,
        yScrollableHeight,
        yThumbScrollableHeight,
      };
    };

    // 指针按下事件处理
    yThumb.addEventListener(
      "pointerdown",
      (e) => {
        if (!e.isPrimary) return;
        e.preventDefault(); // 阻止文本选择

        // 设置全局样式以防止拖动时文本选择
        document.body.style.userSelect = "none";

        // 捕获指针
        yThumb.setPointerCapture(e.pointerId);

        // 存储开始位置
        const { scrollTop } = scrollView;
        const { yScrollableHeight, yThumbScrollableHeight } =
          getYThumbMetrics();
        const yThumbTop =
          scrollTop * (yThumbScrollableHeight / yScrollableHeight);

        dragState.startClientY = e.clientY;
        dragState.startThumbTop = yThumbTop;
        dragState.isDragging = true;

        // 更新状态
        setScrollBarInfo((prev) => ({ ...prev, activeY: true }));
      },
      { signal },
    );

    // 指针移动事件处理
    yThumb.addEventListener(
      "pointermove",
      (e) => {
        if (!dragState.isDragging || !e.isPrimary) return;

        // 使用 RAF 优化性能
        cancelAnimationFrame(yRafRef.current);
        yRafRef.current = requestAnimationFrame(() => {
          const { yScrollableHeight, yThumbScrollableHeight } =
            getYThumbMetrics();

          // 计算新的滑块位置
          const translationY = e.clientY - dragState.startClientY;
          const newThumbTop = translationY + dragState.startThumbTop;
          const boundedTop = clamp(newThumbTop, 0, yThumbScrollableHeight);

          // 直接更新视觉反馈（使滚动更跟手）
          yThumb.style.transform = `translate3d(0, ${boundedTop}px, 0)`;

          // 计算并设置滚动位置
          scrollView.scrollTop =
            (yScrollableHeight / yThumbScrollableHeight) * boundedTop;
        });
      },
      { signal },
    );

    // 指针释放事件处理
    yThumb.addEventListener(
      "pointerup",
      (e) => {
        if (!e.isPrimary) return;
        dragState.isDragging = false;

        // 恢复全局样式
        document.body.style.userSelect = "";

        // 释放指针捕获
        try {
          yThumb.releasePointerCapture(e.pointerId);
        } catch (error) {
          // 忽略可能的错误，例如 pointerId 已不存在
        }

        // 更新状态
        setScrollBarInfo((prev) => ({ ...prev, activeY: false }));
      },
      { signal },
    );

    // 鼠标悬停事件
    yThumb.addEventListener(
      "pointerenter",
      () => {
        setScrollBarInfo((prev) => ({ ...prev, hoverY: true }));
      },
      { signal },
    );

    yThumb.addEventListener(
      "pointerleave",
      () => {
        if (!dragState.isDragging) {
          setScrollBarInfo((prev) => ({ ...prev, hoverY: false }));
        }
      },
      { signal },
    );

    // 清理函数
    return () => {
      controller.abort();
      cancelAnimationFrame(yRafRef.current);
    };
  }, []);

  // 设置水平滚动条的原生事件处理
  React.useEffect(() => {
    const xThumb = xThumbRef.current;
    const scrollView = scrollViewRef.current;
    if (!xThumb || !scrollView) return;

    // 检查是否需要水平滚动
    const needScrollX = scrollView.scrollWidth > scrollView.clientWidth;
    if (!needScrollX) return;

    // 创建 AbortController 用于清理事件监听器
    const controller = new AbortController();
    const { signal } = controller;

    // 存储拖动状态
    const dragState = {
      startClientX: 0,
      startThumbLeft: 0,
      isDragging: false,
    };

    // 水平方向的尺寸计算
    const getXThumbMetrics = () => {
      const { scrollWidth, clientWidth } = scrollView;
      const xScrollableWidth = scrollWidth - clientWidth;
      const xThumbWidth = Math.max(18, clientWidth ** 2 / scrollWidth);
      const needScrollY = scrollView.scrollHeight > scrollView.clientHeight;
      const cornerWidth = needScrollY ? 12 : 0;
      const xThumbScrollableWidth = clientWidth - cornerWidth - xThumbWidth;

      return {
        xThumbWidth,
        xScrollableWidth,
        xThumbScrollableWidth,
      };
    };

    // 指针按下事件处理
    xThumb.addEventListener(
      "pointerdown",
      (e) => {
        if (!e.isPrimary) return;
        e.preventDefault(); // 阻止文本选择

        // 设置全局样式以防止拖动时文本选择
        document.body.style.userSelect = "none";

        // 捕获指针
        xThumb.setPointerCapture(e.pointerId);

        // 存储开始位置
        const { scrollLeft } = scrollView;
        const { xScrollableWidth, xThumbScrollableWidth } = getXThumbMetrics();
        const xThumbLeft =
          scrollLeft * (xThumbScrollableWidth / xScrollableWidth);

        dragState.startClientX = e.clientX;
        dragState.startThumbLeft = xThumbLeft;
        dragState.isDragging = true;

        // 更新状态
        setScrollBarInfo((prev) => ({ ...prev, activeX: true }));
      },
      { signal },
    );

    // 指针移动事件处理
    xThumb.addEventListener(
      "pointermove",
      (e) => {
        if (!dragState.isDragging || !e.isPrimary) return;

        // 使用 RAF 优化性能
        cancelAnimationFrame(xRafRef.current);
        xRafRef.current = requestAnimationFrame(() => {
          const { xScrollableWidth, xThumbScrollableWidth } =
            getXThumbMetrics();

          // 计算新的滑块位置
          const translationX = e.clientX - dragState.startClientX;
          const newThumbLeft = translationX + dragState.startThumbLeft;
          const boundedLeft = clamp(newThumbLeft, 0, xThumbScrollableWidth);

          // 直接更新视觉反馈（使滚动更跟手）
          xThumb.style.transform = `translate3d(${boundedLeft}px, 0, 0)`;

          // 计算并设置滚动位置
          scrollView.scrollLeft =
            (xScrollableWidth / xThumbScrollableWidth) * boundedLeft;
        });
      },
      { signal },
    );

    // 指针释放事件处理
    xThumb.addEventListener(
      "pointerup",
      (e) => {
        if (!e.isPrimary) return;
        dragState.isDragging = false;

        // 恢复全局样式
        document.body.style.userSelect = "";

        // 释放指针捕获
        try {
          xThumb.releasePointerCapture(e.pointerId);
        } catch (error) {
          // 忽略可能的错误，例如 pointerId 已不存在
        }

        // 更新状态
        setScrollBarInfo((prev) => ({ ...prev, activeX: false }));
      },
      { signal },
    );

    // 鼠标悬停事件
    xThumb.addEventListener(
      "pointerenter",
      () => {
        setScrollBarInfo((prev) => ({ ...prev, hoverX: true }));
      },
      { signal },
    );

    xThumb.addEventListener(
      "pointerleave",
      () => {
        if (!dragState.isDragging) {
          setScrollBarInfo((prev) => ({ ...prev, hoverX: false }));
        }
      },
      { signal },
    );

    // 清理函数
    return () => {
      controller.abort();
      cancelAnimationFrame(xRafRef.current);
    };
  }, []);

  // 计算滚动条尺寸
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

  // 根据状态计算背景颜色
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
        onScroll={() => {
          cancelAnimationFrame(scrollRafRef.current);
          scrollRafRef.current = requestAnimationFrame(updateScrollInfo);
        }}
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

      {/* 垂直滚动条 */}
      <Box
        sx={{
          position: "absolute",
          insetInlineEnd: 0,
          insetBlockStart: 0,
          inlineSize: 12,
          blockSize: "100%",
          pointerEvents: "none",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Box
          ref={yThumbRef}
          sx={{
            position: "absolute",
            insetInlineEnd: 0,
            insetBlockStart: 0,
            inlineSize: "100%",
            blockSize: yThumbHeight,
            backgroundColor: backgroundColorY,
            transform: `translate3d(0, ${yThumbTop}px, 0)`,
            cursor: "pointer",
            pointerEvents: "auto",
            touchAction: "none", // 阻止触摸设备上的默认行为
            willChange: "transform", // 提示浏览器优化
          }}
          // 不再使用 React 事件处理器，改用上面的原生事件
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
            pointerEvents: "none",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Box
            ref={xThumbRef}
            sx={{
              position: "absolute",
              insetInlineStart: 0,
              insetBlockEnd: 0,
              inlineSize: xThumbWidth,
              blockSize: "100%",
              backgroundColor: backgroundColorX,
              transform: `translate3d(${xThumbLeft}px, 0, 0)`,
              cursor: "pointer",
              pointerEvents: "auto",
              touchAction: "none",
              willChange: "transform",
            }}
            // 不再使用 React 事件处理器，改用上面的原生事件
          />
        </Box>
      )}

      {/* 滚动条角落 */}
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
