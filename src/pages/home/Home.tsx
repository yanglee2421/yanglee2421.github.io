import { Box, Button } from "@mui/material";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { ChatStream } from "./ChatStream";
import { QueryLabs } from "./QueryLabs";
import { WebpToPng } from "./WebpToPng";

export function Home() {
  const authValue = useAuthStore();

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
      <div className="markdown-body">
        <ChatStream />
      </div>
      <QueryLabs />
      <WebpToPng />
    </Box>
  );
}
