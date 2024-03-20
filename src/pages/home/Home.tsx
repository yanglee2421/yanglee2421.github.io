import { Box, Button } from "@mui/material";
import bgImg from "@/assets/images/justHer.jpg";
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
      <Box
        sx={{
          backgroundImage: `url(${new URL(bgImg, import.meta.url).href})`,
          backgroundAttachment: "fixed",
          aspectRatio: "8/3",
        }}
      />
      <QueryLabs />
      <WebpToPng />
    </Box>
  );
}
