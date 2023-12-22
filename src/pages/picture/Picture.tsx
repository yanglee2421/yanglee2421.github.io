// MUI Imports
import { Card, CardContent, Box } from "@mui/material";

import { useDropzone } from "react-dropzone";

export function Picture() {
  const dropzone = useDropzone({
    maxFiles: 2,
    maxSize: 20 * 1024 * 1024,
    onDrop() {},
    onDropRejected() {},
  });

  return (
    <>
      <Card>
        <CardContent>
          <Box {...dropzone.getRootProps()}>
            <input {...dropzone.getInputProps()} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
