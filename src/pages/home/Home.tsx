import { Box, Button, Divider, Paper, alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import bgImg from "@/assets/images/justHer.jpg";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { InputNumber } from "./InputNumber";

export function Home() {
  const authValue = useAuthStore();

  const [number, setNumber] = React.useState(Number.NaN);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius(theme) {
            return theme.shape.borderRadius + "px";
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,

            backgroundImage: `url(${bgImgHref})`,
            backgroundPosition: "50%",
            backgroundSize: "150%",

            filter: "blur(15px)",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,

            backgroundColor: alpha(grey[700], 0.4),
          }}
        ></Box>
        <Box
          sx={{
            position: "relative",
            zIndex: 3,

            display: "flex",
            alignItems: "center",

            height: 320,
          }}
        >
          <img src={bgImgHref} width={192} height={108} />
        </Box>
      </Box>
      <Divider>start</Divider>
      <Button
        onClick={() => {
          authValue.value.auth.signOut();
        }}
        color="error"
        variant="contained"
      >
        sign out
      </Button>
      <br />
      <InputNumber
        value={number}
        onChange={setNumber}
        step={1}
        min={1}
        max={100}
      />
      <br />
      <Paper sx={{ height: 500, my: 6 }}></Paper>
    </Box>
  );
}

const bgImgHref = new URL(bgImg, import.meta.url).href;
