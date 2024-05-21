import { Stack } from "@mui/material";
import { RollCard } from "./RollCard";
import { Table } from "./Table";

export function Component() {
  return (
    <Stack spacing={6} sx={{ p: 3 }}>
      <RollCard />
      <Table />
    </Stack>
  );
}
