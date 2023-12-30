// MUI Imports
import { Stack } from "@mui/material";

// Components Imports
import { UploadSingleFiles } from "./UploadSingleFiles";
import { UploadMultipleFiles } from "./UploadMultipleFiles";

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
