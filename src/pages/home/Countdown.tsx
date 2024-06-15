import {
  Button,
  Paper,
  Box,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import React from "react";

export function Countdown() {
  const [second, setSecond] = React.useState(10);

  return (
    <Paper sx={{ padding: 3 }}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" value={second} />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(second)}s`}</Typography>
        </Box>
      </Box>
      <Stack direction={"row"} spacing={3}>
        <Button
          onClick={async () => {
            let prevTime = performance.now();
            let animateId = 0;

            const play = () => {
              animateId = requestAnimationFrame(play);

              const currentTime = performance.now();

              if (currentTime - prevTime < 1000) {
                return;
              }

              prevTime = currentTime;

              React.startTransition(() => {
                setSecond((prev) => {
                  if (prev > 0) {
                    return prev - 1;
                  }

                  cancelAnimationFrame(animateId);
                  return prev;
                });
              });
            };

            play();
          }}
          variant="contained"
        >
          start
        </Button>
        <Button
          onClick={() => {
            setSecond(100);
          }}
          variant="outlined"
        >
          restore
        </Button>
      </Stack>
    </Paper>
  );
}
