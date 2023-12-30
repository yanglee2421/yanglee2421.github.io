// Perfect Scrollbar Imports
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// React Imports
import React from "react";

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(
  (props, ref) => {
    // ** Props
    const {
      options,
      style,
      children,
      onPsScrollUp,
      onPsScrollDown,
      onPsScrollLeft,
      onPsScrollRight,
      onPsScrollX,
      onPsScrollY,
      onPsXReachStart,
      onPsXReachEnd,
      onPsYReachStart,
      onPsYReachEnd,
      ...restProps
    } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const psRef = React.useRef<PerfectScrollbar | null>(null);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
      []
    );

    // Create scrollbar
    React.useEffect(() => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      psRef.current = new PerfectScrollbar(containerEl, options);

      return () => {
        psRef.current?.destroy();
        psRef.current = null;
      };
    }, [options]);

    // Update scrollbar
    React.useEffect(() => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const contentEl = contentRef.current;
      if (!contentEl) return;

      const observer = new ResizeObserver(() => {
        psRef.current?.update();
      });

      observer.observe(containerEl);
      observer.observe(contentEl);

      return () => {
        observer.unobserve(containerEl);
        observer.unobserve(contentEl);
        observer.disconnect();
      };
    }, []);

    // Bind event handler
    React.useEffect(() => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const map = new Map<string, (evt: Event) => void>();

      /**
       * Scroll X
       * Scroll Y
       */
      if (typeof onPsScrollX === "function") {
        map.set("ps-scroll-x", onPsScrollX);
      }
      if (typeof onPsScrollY === "function") {
        map.set("ps-scroll-y", onPsScrollY);
      }

      /**
       * Scroll up
       * Scroll down
       * Scroll left
       * Scroll right
       */
      if (typeof onPsScrollUp === "function") {
        map.set("ps-scroll-up", onPsScrollUp);
      }
      if (typeof onPsScrollDown === "function") {
        map.set("ps-scroll-down", onPsScrollDown);
      }
      if (typeof onPsScrollLeft === "function") {
        map.set("ps-scroll-left", onPsScrollLeft);
      }
      if (typeof onPsScrollRight === "function") {
        map.set("ps-scroll-right", onPsScrollRight);
      }

      /**
       * X start
       * X end
       * Y start
       * Y end
       */
      if (typeof onPsXReachStart === "function") {
        map.set("ps-x-reach-start", onPsXReachStart);
      }
      if (typeof onPsXReachEnd === "function") {
        map.set("ps-x-reach-end", onPsXReachEnd);
      }
      if (typeof onPsYReachStart === "function") {
        map.set("ps-y-reach-start", onPsYReachStart);
      }
      if (typeof onPsYReachEnd === "function") {
        map.set("ps-y-reach-end", onPsYReachEnd);
      }

      const controller = new AbortController();

      map.forEach((handler, name) => {
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
      <div
        ref={containerRef}
        style={{ position: "relative", height: "100%", ...style }}
        {...restProps}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    );
  }
);

export type ScrollbarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  options?: PerfectScrollbar.Options;
  onPsScrollY?(evt: Event): void;
  onPsScrollX?(evt: Event): void;
  onPsScrollUp?(evt: Event): void;
  onPsScrollDown?(evt: Event): void;
  onPsScrollLeft?(evt: Event): void;
  onPsScrollRight?(evt: Event): void;
  onPsYReachStart?(evt: Event): void;
  onPsYReachEnd?(evt: Event): void;
  onPsXReachStart?(evt: Event): void;
  onPsXReachEnd?(evt: Event): void;
};
