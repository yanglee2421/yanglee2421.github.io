import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function InternalServerError() {
  useHeadTitle("Internal Server Error");

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
        500
      </Typography>
      <Typography variant="h4" align="center">
        Internal Server Error ⚠️
      </Typography>
      <Typography variant="subtitle1" align="center">
        We couldn't find the page you are looking for.
      </Typography>
      <Button
        component={NavLink}
        to="/"
        variant="contained"
        size="large"
        sx={{ mt: 6, borderRadius: 50 }}
      >
        Take me home
      </Button>
    </Box>
  );
}
