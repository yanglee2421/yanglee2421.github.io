import { Box } from "@mui/material";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React from "react";
import type { BoxProps } from "@mui/material";

export function ScrollView(props: Props) {
  const {
    children,
    options,
    onPsScrollX,
    onPsScrollY,
    onPsScrollUp,
    onPsScrollDown,
    onPsScrollLeft,
    onPsScrollRight,
    onPsXReachStart,
    onPsXReachEnd,
    onPsYReachStart,
    onPsYReachEnd,
    ...restProps
  } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const psRef = React.useRef<PerfectScrollbar | null>(null);

  React.useEffect(() => {
    const containerEl = containerRef.current;

    if (!(containerEl instanceof HTMLElement)) {
      return;
    }

    const contentEl = contentRef.current;

    if (!(contentEl instanceof HTMLElement)) {
      return;
    }

    const clearScrollbar = () => {
      Reflect.deleteProperty(containerEl, "getBoundingClientRect");
      psRef.current?.destroy();
      psRef.current = null;
    };

    const observer = new ResizeObserver(() => {
      Reflect.set(containerEl, "getBoundingClientRect", () => {
        const originRect =
          Element.prototype.getBoundingClientRect.call(containerEl);

        originRect.width = Math.floor(originRect.width);
        originRect.height = Math.floor(originRect.height);

        return originRect;
      });

      if (
        containerEl.scrollHeight > containerEl.clientHeight ||
        containerEl.scrollWidth > containerEl.clientWidth
      ) {
        psRef.current ||= new PerfectScrollbar(containerEl, options);
        psRef.current.update();

        return;
      }

      clearScrollbar();
    });

    observer.observe(containerEl);
    observer.observe(contentEl);

    return () => {
      clearScrollbar();
      observer.disconnect();
    };
  }, [options]);

  React.useEffect(() => {
    const containerEl = containerRef.current;

    if (!(containerEl instanceof HTMLElement)) {
      return;
    }

    const map = new Map<string, undefined | ((evt: Event) => void)>();

    map.set("ps-scroll-x", onPsScrollX);
    map.set("ps-scroll-y", onPsScrollY);
    map.set("ps-scroll-up", onPsScrollUp);
    map.set("ps-scroll-down", onPsScrollDown);
    map.set("ps-scroll-left", onPsScrollLeft);
    map.set("ps-scroll-right", onPsScrollRight);
    map.set("ps-x-reach-start", onPsXReachStart);
    map.set("ps-x-reach-end", onPsXReachEnd);
    map.set("ps-y-reach-start", onPsYReachStart);
    map.set("ps-y-reach-end", onPsYReachEnd);

    const controller = new AbortController();

    map.forEach((handler, name) => {
      if (typeof handler !== "function") {
        return;
      }

      containerEl.addEventListener(name, handler, {
        signal: controller.signal,
      });
    });

    return () => {
      controller.abort();
    };
  }, [
    onPsScrollX,
    onPsScrollY,
    onPsScrollUp,
    onPsScrollDown,
    onPsScrollLeft,
    onPsScrollRight,
    onPsXReachStart,
    onPsXReachEnd,
    onPsYReachStart,
    onPsYReachEnd,
  ]);

  return (
    <Box
      ref={containerRef}
      position={"relative"}
      height={"100%"}
      sx={{
        "&.ps--active-x > *": {
          width: "fit-content",
        },
        "&.ps--active-y > *": {
          height: "fit-content",
        },
      }}
      {...restProps}
    >
      <Box
        ref={contentRef}
        sx={{
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

type Props = BoxProps &
  Partial<{
    options: PerfectScrollbar.Options;
    onPsScrollX(evt: Event): void;
    onPsScrollY(evt: Event): void;
    onPsScrollUp(evt: Event): void;
    onPsScrollDown(evt: Event): void;
    onPsScrollLeft(evt: Event): void;
    onPsScrollRight(evt: Event): void;
    onPsXReachStart(evt: Event): void;
    onPsXReachEnd(evt: Event): void;
    onPsYReachStart(evt: Event): void;
    onPsYReachEnd(evt: Event): void;
  }>;
