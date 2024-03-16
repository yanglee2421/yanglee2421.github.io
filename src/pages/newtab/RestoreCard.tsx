import { LoopOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { CollapsedCard } from "./CollapseCard";

export function RestoreCard() {
  return (
    <CollapsedCard title="Restore Setting" subheader="Restore default settings">
      <Box textAlign={"center"}>
        <Button
          startIcon={<LoopOutlined />}
          variant="outlined"
          color="secondary"
        >
          Restore
        </Button>
      </Box>
    </CollapsedCard>
  );
}
