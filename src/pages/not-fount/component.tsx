import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import snowVillage from "@/assets/images/snowVillage.jpg";

const getCardMediaImage = () => new URL(snowVillage, import.meta.url).href;

export const Component = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        position: "fixed",
        height: "100dvh",
        width: "100dvw",
      }}
    >
      <Card sx={{ minWidth: (t) => t.breakpoints.values.sm }}>
        <CardMedia image={getCardMediaImage()} sx={{ height: 240 }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            404 Not Found
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            This page is not found, please
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={"/"}>
            Take me home
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
