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
  const [second, setSecond] = React.useState(100);

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
          onClick={() => {
            let prevTime = performance.now();
            let animateId = 0;
            const startTime = prevTime;
            const startSecond = second;

            const play = () => {
              animateId = requestAnimationFrame(play);

              const currentTime = performance.now();

              if (currentTime - prevTime < 1000) {
                return;
              }

              prevTime = currentTime;
              const nextSecond = Math.max(
                0,
                startSecond - Math.round((currentTime - startTime) / 1000),
              );

              if (!nextSecond) {
                cancelAnimationFrame(animateId);
              }

              React.startTransition(() => {
                setSecond(nextSecond);
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
