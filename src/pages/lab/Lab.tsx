import { Slider } from "./Slider";
import { Paper } from "@mui/material";
import { Camera } from "@/components/shared/Camera";

export function Lab() {
  return (
    <>
      <Paper sx={{ padding: 3 }}>
        <Slider />
        <Camera width={300} height={200} />
      </Paper>
    </>
  );
}
