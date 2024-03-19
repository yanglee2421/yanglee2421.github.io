import { Box, Button } from "@mui/material";
import bgImg from "@/assets/images/justHer.jpg";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { CodeBlock } from "./CodeBlock";
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
      <QueryLabs />
      <Box
        sx={{
          backgroundImage: `url(${new URL(bgImg, import.meta.url).href})`,
          backgroundAttachment: "fixed",
          aspectRatio: "8/3",
        }}
      />
      <div className="markdown-body">
        <CodeBlock />
      </div>
      <WebpToPng />
    </Box>
  );
}
