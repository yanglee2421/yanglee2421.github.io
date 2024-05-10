import { Table } from "./Table";
import { RollCard } from "./RollCard";
import { Stack } from "@mui/material";

export function Component() {
  return (
    <Stack spacing={6}>
      <RollCard />
      <Table />
    </Stack>
  );
}
