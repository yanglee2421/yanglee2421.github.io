import { DownloadOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import { fabric } from "fabric";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";

import bgImg from "@/assets/images/snow-village.jpg";

import { RightImage } from "./RightImage";

export function Home() {
  const [state, updateState] = useImmer<{
    fileURL: string;
  }>({
    fileURL: "",
  });

  const dropzone = useDropzone({
    onDrop(acceptedFiles) {
      const file = acceptedFiles.at(0);

      if (file instanceof File) {
        updateState((state) => {
          URL.revokeObjectURL(state.fileURL);
          state.fileURL = URL.createObjectURL(file);
        });
      }
    },
    onDropRejected(fileRejections) {
      toast.warn(fileRejections[0].errors[0].message);
    },
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <Box>
      <Card>
        <CardHeader
          title="Upload Single Files"
          subheader="Drop files here or click to upload"
          action={
            !!state.fileURL && (
              <Button
                onClick={async () => {
                  const canvas = new fabric.StaticCanvas(null);
                  const img = await new Promise<fabric.Image>((resolve) => {
                    fabric.Image.fromURL(state.fileURL, resolve);
                  });

                  if (typeof img.width === "number") {
                    canvas.setWidth(img.width);
                  }

                  if (typeof img.height === "number") {
                    canvas.setHeight(img.height);
                  }

                  canvas.add(img);

                  const a = document.createElement("a");
                  a.download = `${Date.now()}.png`;
                  a.href = canvas.toDataURL();
                  a.click();
                  a.remove();
                }}
                startIcon={<DownloadOutlined></DownloadOutlined>}
                variant="outlined"
              >
                download
              </Button>
            )
          }
        ></CardHeader>
        <CardContent>
          <Box
            {...dropzone.getRootProps()}
            height={400}
            border={(theme) => `2px dashed ${theme.palette.divider}`}
            fontSize={64}
            color={(theme) => theme.palette.text.secondary}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <input {...dropzone.getInputProps()} />
            {state.fileURL ? (
              <img src={state.fileURL} alt="upload file" height={360}></img>
            ) : (
              <UploadFileOutlined
                fontSize="inherit"
                color="inherit"
              ></UploadFileOutlined>
            )}
          </Box>
        </CardContent>
      </Card>
      <Box height={400}></Box>
      <Box
        height={400}
        sx={{
          backgroundImage: `url(${bgImg})`,
          backgroundAttachment: "fixed",
        }}
      ></Box>
      <Box height={400}></Box>
      <RightImage></RightImage>
    </Box>
  );
}
