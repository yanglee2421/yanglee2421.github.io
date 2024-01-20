// MUI Imports
import {
  CircularProgress,
  CircularProgressProps,
  Typography,
  Box,
} from "@mui/material";
import { blue } from "@mui/material/colors";

export function CircularProgressWithLabel(
  props: CircularProgressWithLabelProps
) {
  return (
    <Box position="relative" display="inline-flex" color={blue[500]}>
      <CircularProgress variant="determinate" color={"inherit"} {...props} />
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
          component="div"
          variant="caption"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export type CircularProgressWithLabelProps = CircularProgressProps & {
  value: number;
};
