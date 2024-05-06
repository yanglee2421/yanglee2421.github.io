import { LoopOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { CollapsibleCard } from "./CollapsibleCard";

export function RestoreCard() {
  return (
    <CollapsibleCard title="Restore" subheader="Restore default settings">
      <Box textAlign={"center"}>
        <Button
          startIcon={<LoopOutlined />}
          variant="outlined"
          color="secondary"
        >
          Restore
        </Button>
      </Box>
    </CollapsibleCard>
  );
}
