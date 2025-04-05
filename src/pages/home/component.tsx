import readme from "@/assets/markdown.md?raw";
import { Markdown } from "@/components/markdown";
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
      <Markdown code={readme} />
    </Box>
  );
};
