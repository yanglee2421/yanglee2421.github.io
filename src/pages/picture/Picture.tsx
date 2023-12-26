// MUI Imports
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
} from "@mui/material";
import { CodeOutlined } from "@mui/icons-material";

// Components Imports
import { UploadSingleFiles } from "./UploadSingleFiles";
import { UploadMultipleFiles } from "./UploadMultipleFiles";

export function Picture() {
  return (
    <>
      <Stack padding={2} spacing={4}>
        <UploadSingleFiles></UploadSingleFiles>
        <UploadMultipleFiles></UploadMultipleFiles>

        <Card>
          <CardHeader
            title="Upload Multiple Files"
            action={
              <IconButton>
                <CodeOutlined></CodeOutlined>
              </IconButton>
            }
          ></CardHeader>
          <CardContent></CardContent>
        </Card>
      </Stack>
    </>
  );
}
