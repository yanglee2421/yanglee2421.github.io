import { Markdown } from "@/components/markdown";
import handbook from "@/assets/handbook.md?raw";
import { Box } from "@mui/material";

export const Component = () => {
  return (
    <Box
      sx={{
        "& pre.shiki": {
          whiteSpace: "pre-wrap",
        },
      }}
    >
      <Markdown code={handbook} />
    </Box>
  );
};
