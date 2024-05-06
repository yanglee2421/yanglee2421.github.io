import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export function Forbidden() {
  return (
    <Box>
      <Button component={Link} to={"/"} variant="contained">
        Take me home
      </Button>
    </Box>
  );
}
