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
      <Box display={"flex"} flexDirection={"column"} height={"100%"}>
        <Appbar />
        <Box flex={1} overflow={"hidden"}>
          {outlet}
        </Box>
      </Box>
    </>
  );
}
