// MUI Imports
import { Box, Button } from "@mui/material";

// Components Imports
import { GlobalBg } from "@/components/ui";

// Router Imports
import { Link } from "react-router-dom";

export function NotAllow() {
  return (
    <>
      <GlobalBg />
      <Box>
        <Button component={Link} to={"/"} variant="contained">
          Take me home
        </Button>
      </Box>
    </>
  );
}
