// React Imports
import React from "react";

// Profetch Scrollbar Imports
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// Hooks Imports
import { useObserverResize } from "@/hooks";

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(
  (props, ref) => {
    // ** Props
    const { options, style, children, ...restProps } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => {
      const el = containerRef.current;
      if (!el) throw new Error("Excepted an HTMLDivElement, got falsy!");

      return el;
    });

    // Get perfect scrollbar after element mounted
    const psRef = React.useRef<PerfectScrollbar | null>(null);
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      psRef.current = new PerfectScrollbar(el, options);

      return () => {
        psRef.current?.destroy();
        psRef.current = null;
      };
    }, [containerRef, options]);

    // Update perfect scrollbar after container resize
    const containerEntry = useObserverResize(containerRef);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const contentEntry = useObserverResize(contentRef);
    React.useEffect(() => {
      void containerEntry;
      void contentEntry;
      psRef.current?.update();
    }, [containerEntry, contentEntry, psRef]);

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

export interface ScrollbarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  options?: PerfectScrollbar.Options;
}
