// MUI Imports
import { Stack } from "@mui/material";

// Components Imports
import { UploadMultipleFiles } from "./UploadMultipleFiles";
import { UploadSingleFiles } from "./UploadSingleFiles";

export function Picture() {
  return (
    <>
      <Stack padding={2} spacing={4}>
        <UploadSingleFiles></UploadSingleFiles>
        <UploadMultipleFiles></UploadMultipleFiles>
      </Stack>
    </>
  );
}
