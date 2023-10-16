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
    const { options, style, ...restProps } = props;

    const boxRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => {
      const el = boxRef.current;
      if (!el) throw new Error("");

      return el;
    });

    // Get perfect scrollbar after element mounted
    const psRef = React.useRef<PerfectScrollbar | null>(null);
    React.useEffect(() => {
      const el = boxRef.current;
      if (!el) return;

      psRef.current = new PerfectScrollbar(el, options);

      return () => {
        psRef.current?.destroy();
        psRef.current = null;
      };
    }, [boxRef]);

    // Update perfect scrollbar after container resize
    const entry = useObserverResize(boxRef);
    React.useEffect(() => {
      void entry;
      psRef.current?.update();
    }, [entry, psRef]);

    return (
      <div ref={boxRef} style={{ height: "100%", ...style }} {...restProps} />
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
