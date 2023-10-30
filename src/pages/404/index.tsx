// Router Imports
import { NavLink } from "react-router-dom";

// MUI Imports
import { Box, Button, Typography, Container } from "@mui/material";

// Assets Imports
import snowVillage from "@/assets/images/snow-village.jpg";

export function Component() {
  return (
    <Box
      position={"fixed"}
      display={"flex"}
      sx={{
        inset: 0,
        backgroundImage: `url(${snowVillage})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        // backgroundAttachment: "fixed",
      }}
    >
      <Box
        position={"absolute"}
        sx={{
          inset: 0,
          zIndex: -1,
          backgroundColor: "rgba(0,0,0,.15)",
          backdropFilter: "blur(10px)",
        }}
      ></Box>
      <Container disableGutters sx={{ pt: 36, px: 16 }}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h2">Page not found</Typography>
        <Typography mt={6}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur eum
          nulla possimus officiis, placeat ut minima quo blanditiis maxime aut
          eius tenetur assumenda recusandae, laudantium quae ex. Voluptates, qui
          iusto!
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
      </Container>
    </Box>
  );
}
