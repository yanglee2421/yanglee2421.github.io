import { SendOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  TextField,
  alpha,
  InputAdornment,
  IconButton,
} from "@mui/material";
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
      <Button
        onClick={() => {
          authValue.value.auth.signOut();
        }}
        color="error"
        variant="contained"
      >
        sign out
      </Button>
      <Divider>Component</Divider>
      <InputNumber
        value={number}
        onChange={setNumber}
        step={1}
        min={1}
        max={100}
      />
      <br />
      <TextField
        multiline
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SendOutlined />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <Divider>Component</Divider>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
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
    </Box>
  );
}

const bgImgHref = new URL(bgImg, import.meta.url).href;
