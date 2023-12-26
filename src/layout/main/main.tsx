// Router Imports
import { useOutlet } from "react-router-dom";

// MUI Imports
import { Box } from "@mui/material";

// Component Imports
import { Appbar } from "@/components/layout";
import React from "react";
import { useObserverResize } from "@/hooks";

export function Main() {
  const outlet = useOutlet();
  const appBarRef = React.useRef<HTMLElement>(null);
  const resizeEntry = useObserverResize(appBarRef);

  return (
    <>
      <Appbar ref={appBarRef} />
      <Box sx={{ mt: `${resizeEntry?.borderBoxSize.at(0)?.blockSize}px` }}>
        {outlet}
      </Box>
    </>
  );
}
