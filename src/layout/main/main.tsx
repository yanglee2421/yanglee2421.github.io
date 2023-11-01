// Router Imports
import { useOutlet } from "react-router-dom";

// MUI Imports
import { Box } from "@mui/material";

// Component Imports
import { Appbar } from "@/components/layout";

export function Main() {
  const outlet = useOutlet();

  return (
    <>
      <Appbar />
      <Box>{outlet}</Box>
    </>
  );
}
