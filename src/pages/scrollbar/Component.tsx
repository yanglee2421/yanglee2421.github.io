import React from "react";

export function Component() {
  const ref = React.useRef<HTMLDivElement>(null);

  return <div ref={ref}></div>;
}
