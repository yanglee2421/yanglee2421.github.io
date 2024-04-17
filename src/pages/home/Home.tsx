import { Box, Button, Divider, alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import "react-datepicker/dist/react-datepicker.css";
import bgImg from "@/assets/images/justHer.jpg";
import { ScrollView } from "@/components/ui/ScrollView";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { JsonBlock } from "./JsonBlock";

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
      <Box sx={{ height: 420 }}></Box>
      <Divider>Component</Divider>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,

            backgroundImage: `url(${bgImgHref})`,
            backgroundPosition: "50%",
            backgroundSize: "150%",

            filter: "blur(15px)",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,

            backgroundColor: alpha(grey[700], 0.4),
          }}
        ></Box>
        <Box
          sx={{
            position: "relative",
            zIndex: 3,

            display: "flex",
            alignItems: "center",

            height: 320,
          }}
        >
          <img src={bgImgHref} width={192} height={108} />
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <ScrollView>
          <JsonBlock />
        </ScrollView>
      </Box>
    </Box>
  );
}

const bgImgHref = new URL(bgImg, import.meta.url).href;
