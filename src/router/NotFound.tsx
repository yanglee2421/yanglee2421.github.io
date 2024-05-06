import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function NotFound() {
  useHeadTitle("Not Found");

  return (
    <Box
      color="common.white"
      textAlign={"center"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
    >
      <Typography variant="h1" align="center">
        404
      </Typography>
      <Typography variant="h4" align="center">
        Page Not Found ⚠️
      </Typography>
      <Typography variant="subtitle1" align="center">
        We couldn't find the page you are looking for.
      </Typography>

      <NavLink to={{ pathname: "/" }}>
        <Button variant="contained">Take me home</Button>
      </NavLink>
    </Box>
  );
}
