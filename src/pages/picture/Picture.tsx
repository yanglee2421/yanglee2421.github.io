import { Stack } from "@mui/material";
import { UploadMultipleFiles } from "./UploadMultipleFiles";
import { UploadSingleFiles } from "./UploadSingleFiles";

export function Picture() {
  return (
    <Stack padding={2} spacing={4}>
      <UploadSingleFiles />
      <UploadMultipleFiles />
    </Stack>
  );
}
