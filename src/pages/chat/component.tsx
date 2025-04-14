import { Box, Container } from "@mui/material";
import { CopilotChat } from "@/components/chat";

export const Component = () => {
  return (
    <Box
      data-contentfixed
      sx={{
        blockSize: "100%",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container maxWidth="md" sx={{ blockSize: "100%" }}>
        <CopilotChat />
      </Container>
    </Box>
  );
};
