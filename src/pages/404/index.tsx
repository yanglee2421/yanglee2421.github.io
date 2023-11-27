// Router Imports
import { NavLink } from "react-router-dom";

// MUI Imports
import {
  Box,
  Button,
  Typography,
  Container,
  Backdrop,
  CircularProgress,
} from "@mui/material";

// API Imports
import { useBgImgQuery } from "@/hooks/api-localforage";

export function Component() {
  const bgImgQuery = useBgImgQuery();

  return (
    <>
      <Backdrop open={bgImgQuery.isPending} sx={{ color: "common.white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        position={"fixed"}
        display={"flex"}
        sx={{
          inset: 0,
          backgroundImage: `url(${bgImgQuery.data})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          // backgroundAttachment: "fixed",
        }}
      >
        <Container disableGutters sx={{ pt: 36, px: 16 }}>
          <Typography variant="h1">404</Typography>
          <Typography variant="h2">Page not found</Typography>
          <Typography mt={6}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
            eum nulla possimus officiis, placeat ut minima quo blanditiis maxime
            aut eius tenetur assumenda recusandae, laudantium quae ex.
            Voluptates, qui iusto!
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
    </>
  );
}
