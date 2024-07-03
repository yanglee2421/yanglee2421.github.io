import { ScrollView } from "@/components/ui/ScrollView";
import { Box, Button } from "@mui/material";

export function Chat() {
  return (
    <Box
      sx={{
        border: "1px solid red",
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gridTemplateRows: "100dvh",
      }}
    >
      <Box
        sx={{
          border: "1px solid green",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <h1>1531313</h1>
        </Box>
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <ScrollView>
            <Box height={6000}></Box>
          </ScrollView>
        </Box>
      </Box>
      <Box
        sx={{
          border: "1px solid blue",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <h2>35415841</h2>
        </Box>
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <ScrollView>
            <Box height={6000}></Box>
          </ScrollView>
        </Box>
        <Box>
          <Button variant="outlined">chat</Button>
        </Box>
      </Box>
    </Box>
  );
}
